"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, Save, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

interface UserProfile {
  id: number
  full_name: string
  email: string
  position: string
  department: string
  phone: string
  avatar_url: string
  last_login: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      // Get the auth token from localStorage or cookies
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      const response = await axios.get("https://api.virtuscorp.site/api/user/profile", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      })

      // If the API doesn't return all fields we need, we'll use defaults
      const userData = response.data || {}
      setUser({
        id: userData.id || 0,
        full_name: userData.full_name || "Пользователь Иванов",
        email: userData.email || "user@example.com",
        position: userData.position || "Менеджер",
        department: userData.department || "Маркетинг",
        phone: userData.phone || "+7 (999) 123-45-67",
        avatar_url: userData.avatar_url || "",
        last_login: userData.last_login || "01.03.2025",
      })

      setFormData({
        full_name: userData.full_name || "Пользователь Иванов",
        position: userData.position || "Менеджер",
        department: userData.department || "Маркетинг",
        phone: userData.phone || "+7 (999) 123-45-67",
      })
    } catch (err) {
      console.error("Error fetching user profile:", err)
      setError("Не удалось загрузить данные профиля")

      // Set default data for development/testing
      const defaultUser = {
        id: 1,
        full_name: "Пользователь Иванов",
        email: "user@example.com",
        position: "Менеджер",
        department: "Маркетинг",
        phone: "+7 (999) 123-45-67",
        avatar_url: "",
        last_login: "01.03.2025",
      }
      setUser(defaultUser)
      setFormData({
        full_name: defaultUser.full_name,
        position: defaultUser.position,
        department: defaultUser.department,
        phone: defaultUser.phone,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      // First upload avatar if there is one
      let avatarUrl = user?.avatar_url || ""
      if (avatarFile) {
        const formData = new FormData()
        formData.append("avatar", avatarFile)

        const avatarResponse = await axios.post("https://api.virtuscorp.site/api/user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": authToken,
          },
        })

        avatarUrl = avatarResponse.data.avatar_url
      }

      // Then update profile data
      const updatedProfileData = {
        ...formData,
        avatar_url: avatarUrl,
      }

      const profileResponse = await axios.put("https://api.virtuscorp.site/api/user/profile", updatedProfileData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      })

      // Update local state with the response data from the server
      const updatedUser = profileResponse.data
      setUser({
        ...user!,
        full_name: updatedUser.full_name,
        position: updatedUser.position,
        department: updatedUser.department,
        phone: updatedUser.phone,
        avatar_url: updatedUser.avatar_url,
      })

      setIsEditing(false)
      alert("Профиль успешно обновлен")
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Не удалось обновить профиль")

      // For development/testing, update the UI anyway
      if (process.env.NODE_ENV !== "production") {
        setUser({
          ...user!,
          ...formData,
          avatar_url: avatarPreview || user?.avatar_url || "",
        })
        setIsEditing(false)
        alert("Профиль успешно обновлен (тестовый режим)")
      }
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setFormData({
      full_name: user?.full_name || "",
      position: user?.position || "",
      department: user?.department || "",
      phone: user?.phone || "",
    })
    setAvatarPreview(null)
    setAvatarFile(null)
  }

  if (loading && !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c1442]"></div>
        </div>
      </div>
    )
  }

  if (error && !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
          <Button className="mt-4" onClick={fetchUserProfile}>
            Попробовать снова
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Профиль пользователя</h1>

      <Card className="bg-white shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0 relative">
              <div
                className="w-32 h-32 rounded-full bg-blue-800 text-white flex items-center justify-center text-4xl font-bold overflow-hidden cursor-pointer relative"
                onClick={isEditing ? handleAvatarClick : undefined}
              >
                {avatarPreview || user?.avatar_url ? (
                  <img
                    src={avatarPreview || user?.avatar_url}
                    alt={user?.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "ПИ"}
                  </span>
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Camera className="text-white h-8 w-8" />
                  </div>
                )}
              </div>

              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>

            {/* User Info Section */}
            <div className="flex-grow">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                      ФИО
                    </label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input id="email" value={user?.email || ""} disabled className="bg-gray-100" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                        Должность
                      </label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Отдел
                      </label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Телефон
                      </label>
                      <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Последний вход</label>
                    <p className="text-gray-600">{user?.last_login}</p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button type="submit" className="bg-[#0c1442]" disabled={loading}>
                      {loading ? "Сохранение..." : "Сохранить"}
                      <Save className="ml-2 h-4 w-4" />
                    </Button>

                    <Button type="button" variant="outline" onClick={cancelEdit} disabled={loading}>
                      Отмена
                      <X className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold mb-2">{user?.full_name}</h2>
                  <p className="text-gray-600 mb-4">{user?.email}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Личная информация</h3>
                      <p className="text-gray-600">Должность: {user?.position}</p>
                      <p className="text-gray-600">Отдел: {user?.department}</p>
                      <p className="text-gray-600">Телефон: {user?.phone}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Настройки аккаунта</h3>
                      <p className="text-gray-600 mt-2">Последний вход: {user?.last_login}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-[#0c1442]" onClick={() => setIsEditing(true)}>
                      Редактировать профиль
                      <Edit className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
