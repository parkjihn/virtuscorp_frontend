"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios, { type AxiosError } from "axios"

export default function DataSourcesPage() {
  const [campaignId, setCampaignId] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [token, setToken] = useState("")
  const [uploadMessage, setUploadMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = async () => {
    try {
      await axios.post("/api/yandex-market/save", {
        campaign_id: campaignId,
        business_id: businessId,
        token,
      })
      alert("Данные сохранены")
    } catch (error) {
      alert("Ошибка при сохранении")
      console.error(error)
    }
  }

  const handleVerify = async () => {
    try {
      const res = await axios.post("/api/yandex-market/test", {
        campaign_id: campaignId,
        business_id: businessId,
        token,
      })
      if (res.data.success) {
        alert("Подключение успешно")
      } else {
        alert("Ошибка подключения: " + res.data.detail)
      }
    } catch (error) {
      alert("Ошибка подключения")
      console.error(error)
    }
  }

  const handleFileUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      // Получаем токен из localStorage или куки
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      console.log("Файл для загрузки:", file.name)
      console.log("Токен аутентификации найден:", !!authToken)

      // Fix: Use the correct endpoint URL
      const response = await axios.post("https://api.virtuscorp.site/api/upload-metrics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": authToken, // Добавляем токен в заголовок
        },
        withCredentials: true, // Чтобы отправлялись куки
      })

      console.log("Ответ сервера:", response.data)
      setUploadMessage("Файл успешно загружен!")
    } catch (err) {
      console.error("Ошибка загрузки файла:", err)

      // Типизируем ошибку как AxiosError
      const axiosError = err as AxiosError<{ detail?: string }>

      setUploadMessage(
        `Ошибка при загрузке: ${axiosError.response?.status || ""} ${axiosError.response?.data?.detail || axiosError.message || ""}`,
      )
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-2">Источники данных</h1>
      <p className="text-gray-600 mb-6">Управление и настройка внешних подключений данных.</p>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Подключение к Яндекс Маркет</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="ID кампании"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
            />
            <Input
              type="text"
              placeholder="ID кабинета"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
            />
            <Input type="password" placeholder="Токен" value={token} onChange={(e) => setToken(e.target.value)} />
            <div className="flex space-x-4">
              <Button className="bg-[#0c1442]" onClick={handleSave}>
                Сохранить
              </Button>
              <Button variant="outline" className="border-[#0c1442] text-[#0c1442]" onClick={handleVerify}>
                Проверить
              </Button>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div>
          <h2 className="text-lg font-semibold mb-4">Локальная загрузка Excel / CSV</h2>
          <input type="file" ref={fileInputRef} accept=".csv,.xlsx" />
          <Button className="mt-2 bg-[#0c1442]" onClick={handleFileUpload}>
            Загрузить
          </Button>
          {uploadMessage && <p className="mt-2 text-sm text-gray-600">{uploadMessage}</p>}
        </div>
      </div>
    </div>
  )
}
