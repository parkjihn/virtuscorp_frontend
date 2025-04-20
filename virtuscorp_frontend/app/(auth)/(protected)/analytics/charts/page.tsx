"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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

interface ChartRow {
  name: string
  product1: number
  product2: number
  conversions: number
  visits: number
}

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [data, setData] = useState<ChartRow[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/uploaded-data")
        const raw = res.data.data || []

        const parsed: ChartRow[] = raw.map((row: Record<string, unknown>) => {
          return {
            name: typeof row["Month"] === "string"
              ? row["Month"]
              : typeof row["name"] === "string"
              ? row["name"]
              : "N/A",

            product1: typeof row["Product1"] === "number"
              ? row["Product1"]
              : typeof row["product1"] === "number"
              ? row["product1"]
              : 0,

            product2: typeof row["Product2"] === "number"
              ? row["Product2"]
              : typeof row["product2"] === "number"
              ? row["product2"]
              : 0,

            conversions: typeof row["Conversions"] === "number"
              ? row["Conversions"]
              : typeof row["conversions"] === "number"
              ? row["conversions"]
              : 0,

            visits: typeof row["Visits"] === "number"
              ? row["Visits"]
              : typeof row["visits"] === "number"
              ? row["visits"]
              : 0,
          }
        })

        setData(parsed)
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-2">Графики</h1>
      <p className="text-gray-600 mb-6">Визуализация данных из загруженного файла</p>

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
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="product1" stroke="#0c1442" strokeWidth={2} />
                    <Line type="monotone" dataKey="product2" stroke="#9ca3af" strokeWidth={2} />
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
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversions" stroke="#0c1442" strokeWidth={2} />
                    <Line type="monotone" dataKey="visits" stroke="#9ca3af" strokeWidth={2} />
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
                <CardTitle className="text-lg">Сравнение продаж</CardTitle>
                <p className="text-xs text-gray-500">{timeRange === "month" ? "За месяц" : ""}</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="product1" fill="#0c1442" />
                    <Bar dataKey="product2" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Сравнение конверсий</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="conversions" fill="#0c1442" />
                    <Bar dataKey="visits" fill="#9ca3af" />
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
