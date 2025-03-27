"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for the charts
const priceChangesData = [
  { name: "Jan", product1: 400, product2: 300 },
  { name: "Feb", product1: 500, product2: 250 },
  { name: "Mar", product1: 450, product2: 300 },
  { name: "Apr", product1: 470, product2: 270 },
  { name: "May", product1: 400, product2: 230 },
  { name: "Jun", product1: 350, product2: 220 },
  { name: "Jul", product1: 450, product2: 200 },
  { name: "Aug", product1: 400, product2: 180 },
  { name: "Sep", product1: 380, product2: 170 },
  { name: "Oct", product1: 410, product2: 150 },
  { name: "Nov", product1: 380, product2: 140 },
  { name: "Dec", product1: 350, product2: 130 },
]

const conversionsData = [
  { name: "Jan", conversions: 400, visits: 300 },
  { name: "Feb", conversions: 380, visits: 340 },
  { name: "Mar", conversions: 350, visits: 330 },
  { name: "Apr", conversions: 340, visits: 350 },
  { name: "May", conversions: 320, visits: 320 },
  { name: "Jun", conversions: 300, visits: 360 },
  { name: "Jul", conversions: 280, visits: 340 },
  { name: "Aug", conversions: 260, visits: 380 },
  { name: "Sep", conversions: 250, visits: 350 },
  { name: "Oct", conversions: 240, visits: 400 },
  { name: "Nov", conversions: 260, visits: 390 },
  { name: "Dec", conversions: 280, visits: 380 },
]

const categorySalesData = [
  { name: "Электроника", current: 400, previous: 300 },
  { name: "Одежда", current: 300, previous: 250 },
  { name: "Дом", current: 200, previous: 220 },
  { name: "Красота", current: 380, previous: 230 },
  { name: "Спорт", current: 350, previous: 280 },
  { name: "Книги", current: 500, previous: 350 },
  { name: "Игрушки", current: 340, previous: 240 },
  { name: "Прочее", current: 280, previous: 300 },
]

const skuSalesData = [
  { name: "SKU-001", current: 800, previous: 200 },
  { name: "SKU-002", current: 650, previous: 300 },
  { name: "SKU-003", current: 400, previous: 250 },
  { name: "SKU-004", current: 700, previous: 150 },
  { name: "SKU-005", current: 550, previous: 200 },
  { name: "SKU-006", current: 200, previous: 150 },
]

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-2">Графики</h1>
      <p className="text-gray-600 mb-6">Визуализация данных по продажам и конверсиям</p>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Период:</span>
          <div className="flex space-x-2">
            {["week", "month", "quarter", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeRange(period)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === period ? "bg-[#0c1442] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {period === "week" && "Неделя"}
                {period === "month" && "Месяц"}
                {period === "quarter" && "Квартал"}
                {period === "year" && "Год"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="line" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="line">Линейные графики</TabsTrigger>
          <TabsTrigger value="bar">Столбчатые диаграммы</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Изменения цен</CardTitle>
                <p className="text-xs text-gray-500">
                  {timeRange === "week" && "За неделю"}
                  {timeRange === "month" && "За месяц"}
                  {timeRange === "quarter" && "За квартал"}
                  {timeRange === "year" && "За год"}
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={priceChangesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="product1"
                      stroke="#0c1442"
                      strokeWidth={3}
                      dot={{ r: 0 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="product2"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Конверсии</CardTitle>
                <p className="text-xs text-gray-500">
                  {timeRange === "week" && "За неделю"}
                  {timeRange === "month" && "За месяц"}
                  {timeRange === "quarter" && "За квартал"}
                  {timeRange === "year" && "За год"}
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={conversionsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="#0c1442"
                      strokeWidth={3}
                      dot={{ r: 0 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#9ca3af"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Сравнение продаж по категориям</CardTitle>
                <p className="text-xs text-gray-500">
                  {timeRange === "week" && "За неделю"}
                  {timeRange === "month" && "За месяц"}
                  {timeRange === "quarter" && "За квартал"}
                  {timeRange === "year" && "За год"}
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={categorySalesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" stackId="a" fill="#0c1442" />
                    <Bar dataKey="previous" stackId="a" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Сравнение продаж по SKU</CardTitle>
                <p className="text-xs text-gray-500">
                  {timeRange === "week" && "За неделю"}
                  {timeRange === "month" && "За месяц"}
                  {timeRange === "quarter" && "За квартал"}
                  {timeRange === "year" && "За год"}
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    layout="vertical"
                    data={skuSalesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 40,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" stackId="a" fill="#0c1442" />
                    <Bar dataKey="previous" stackId="a" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

