"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Настройки приложения</h1>
      <p className="text-gray-600 mb-6">Управление конфигурациями</p>

      <Card className="border shadow-sm">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Общие настройки</h2>

            <div className="mb-4">
              <label className="block text-sm mb-1">Язык</label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>English</option>
                <option>Русский</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Часовой пояс</label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>GMT</option>
                <option>UTC+3 (Moscow)</option>
                <option>UTC-5 (Eastern)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Тема</label>
              <div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="bg-[#0c1442] data-[state=unchecked]:bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Управление учетной записью</h2>
            <div className="space-y-2">
              <Button className="w-full sm:w-auto bg-[#0c1442] hover:bg-[#0c1442]/90 text-white font-medium">
                Изменить пароль
              </Button>
              <div>
                <Button className="w-full sm:w-auto bg-[#0c1442] hover:bg-[#0c1442]/90 text-white font-medium">
                  Удалить учетную запись
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" className="bg-gray-200 hover:bg-gray-300 border-gray-300 text-gray-700 px-8">
              Отменить
            </Button>
            <Button className="bg-[#0c1442] hover:bg-[#0c1442]/90 text-white px-8">Сохранить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

