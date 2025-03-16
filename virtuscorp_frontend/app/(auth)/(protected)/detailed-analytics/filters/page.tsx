"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DetailedAnalyticsFiltersPage() {
  // Состояние для значений формы
  const [dateRange, setDateRange] = useState("")
  const [predefinedPeriod, setPredefinedPeriod] = useState("7 дней")
  const [timeInterval, setTimeInterval] = useState("Ежедневно")
  const [productCategory, setProductCategory] = useState("Электроника")
  const [transactionType, setTransactionType] = useState("Продажи")
  const [revenueThreshold, setRevenueThreshold] = useState("150")
  const [profitMargin, setProfitMargin] = useState("150")
  const [avgTransactionValue, setAvgTransactionValue] = useState("150")

 
  const resetTimeframeFilters = () => {
    setDateRange("")
    setPredefinedPeriod("7 дней")
    setTimeInterval("Ежедневно")
  }

  const resetCategoryFilters = () => {
    setProductCategory("Электроника")
    setTransactionType("Продажи")
  }

  const resetFinancialFilters = () => {
    setRevenueThreshold("150")
    setProfitMargin("150")
    setAvgTransactionValue("150")
  }


  const applyFilters = (section: string) => {
    console.log(`Применены фильтры ${section}`)
  }

 
  const saveCurrentFilterSet = () => {
    console.log("Сохранен текущий набор фильтров")
  }

  
  const handleCancel = () => {
    console.log("Отменено")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Фильтры детальной аналитики</h1>
      <p className="text-gray-600 mb-6">Уточните представление данных, чтобы сосредоточиться на самом важном.</p>

      <div className="border rounded-lg p-6">
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Фильтры временных рамок</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">Диапазон дат</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите диапазон дат" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Последние 7 дней</SelectItem>
                <SelectItem value="last-30-days">Последние 30 дней</SelectItem>
                <SelectItem value="last-90-days">Последние 90 дней</SelectItem>
                <SelectItem value="custom">Произвольный период</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Предопределенные периоды</label>
            <Select value={predefinedPeriod} onValueChange={setPredefinedPeriod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="7 дней" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">7 дней</SelectItem>
                <SelectItem value="14-days">14 дней</SelectItem>
                <SelectItem value="30-days">30 дней</SelectItem>
                <SelectItem value="90-days">90 дней</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Временной интервал</label>
            <Select value={timeInterval} onValueChange={setTimeInterval}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ежедневно" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Почасово</SelectItem>
                <SelectItem value="daily">Ежедневно</SelectItem>
                <SelectItem value="weekly">Еженедельно</SelectItem>
                <SelectItem value="monthly">Ежемесячно</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={resetTimeframeFilters}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => applyFilters("timeframe")}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Применить
            </Button>
          </div>
        </div>

       
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Фильтры категорий и типов</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">Категории продуктов</label>
            <Select value={productCategory} onValueChange={setProductCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Электроника" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Электроника</SelectItem>
                <SelectItem value="clothing">Одежда</SelectItem>
                <SelectItem value="home-goods">Товары для дома</SelectItem>
                <SelectItem value="beauty">Красота</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Типы транзакций</label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Продажи" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Продажи</SelectItem>
                <SelectItem value="returns">Возвраты</SelectItem>
                <SelectItem value="exchanges">Обмены</SelectItem>
                <SelectItem value="refunds">Возмещения</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={resetCategoryFilters}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => applyFilters("category")}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Применить
            </Button>
          </div>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold mb-4">Фильтры финансовых показателей</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">Пороги выручки</label>
            <Input
              type="number"
              value={revenueThreshold}
              onChange={(e) => setRevenueThreshold(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Маржа прибыли</label>
            <Input
              type="number"
              value={profitMargin}
              onChange={(e) => setProfitMargin(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Средняя стоимость транзакции</label>
            <Input
              type="number"
              value={avgTransactionValue}
              onChange={(e) => setAvgTransactionValue(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={resetFinancialFilters}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Сбросить
            </Button>
            <Button
              onClick={() => applyFilters("financial")}
              className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[100px]"
            >
              Применить
            </Button>
          </div>
        </div>
      </div>

      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handleCancel} className="w-[200px]">
          Отмена
        </Button>
        <Button onClick={saveCurrentFilterSet} className="bg-[#0c1442] text-white hover:bg-[#0c1442]/90 w-[200px]">
          Сохранить текущий набор фильтров
        </Button>
      </div>
    </div>
  )
}

