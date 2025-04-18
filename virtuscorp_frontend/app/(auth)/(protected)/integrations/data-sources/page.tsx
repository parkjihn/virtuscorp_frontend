"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function DataSourcesPage() {
  const [campaignId, setCampaignId] = useState("")
  const [businessId, setBusinessId] = useState("")
  const [token, setToken] = useState("")

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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-2">Источники данных</h1>
      <p className="text-gray-600 mb-6">Управление и настройка внешних подключений данных.</p>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Подключение к Яндекс Маркет</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="ID кампании (campaign_id)"
                name="campaign_id"
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
              />
              <Input
                type="text"
                placeholder="ID кабинета (business_id)"
                name="business_id"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Авторизационный токен"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />

              <div className="flex space-x-4">
                <Button className="bg-[#0c1442]" onClick={handleSave}>Сохранить</Button>
                <Button variant="outline" className="border-[#0c1442] text-[#0c1442]" onClick={handleVerify}>
                  Проверить
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
