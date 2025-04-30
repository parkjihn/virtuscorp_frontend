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

// Define a more flexible type for raw data from server
interface RawMetricRow {
  [key: string]: string | number | null | undefined
}

// Define the processed data structure for charts
interface MetricRow {
  Date: string
  Orders: number
  SalesVolume: number
  AverageCheck: number
  ConversionRate: number
  GMV: number
  AveragePrice: number
  Margin: number
  PriceDynamics: number
  DeliveryTime: number
  OrdersInTransit: number
  Returns: number
  RepeatPurchases: number
  ReviewsRatings: number
  NPS: number
}

export default function ChartsPage() {
  const [data, setData] = useState<MetricRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get the auth token from localStorage or cookies
        const authToken =
          localStorage.getItem("auth-token") ||
          document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

        console.log("Fetching data with auth token:", !!authToken)

        const res = await axios.get("https://api.virtuscorp.site/api/uploaded-data", {
          headers: {
            "x-auth-token": authToken,
          },
          withCredentials: true,
        })

        console.log("Raw response data:", res.data)

        if (!res.data || !res.data.data || !Array.isArray(res.data.data)) {
          console.error("Invalid data format received:", res.data)
          setError("Received invalid data format from server")
          setData([])
          return
        }

        const raw: RawMetricRow[] = res.data.data

        // More robust data parsing with fallbacks and type checking
        const parsed: MetricRow[] = raw.map((row) => {
          // Ensure we have a date field, or use a fallback
          const dateValue = row["Date"] || row["date"] || row["Дата"] || "Unknown Date"

          return {
            Date: String(dateValue),
            Orders: parseMetricValue(row, ["Orders", "Заказы", "order_count"]),
            SalesVolume: parseMetricValue(row, ["Sales Volume", "Объем продаж", "sales_volume"]),
            AverageCheck: parseMetricValue(row, ["Average Check (AOV)", "Средний чек", "average_check"]),
            ConversionRate: parseMetricValue(row, ["Conversion Rate (%)", "Конверсия (%)", "conversion_rate"]),
            GMV: parseMetricValue(row, ["GMV", "ОСП"]),
            AveragePrice: parseMetricValue(row, ["Average Price", "Средняя цена", "average_price"]),
            Margin: parseMetricValue(row, ["Margin (%)", "Маржа (%)", "margin"]),
            PriceDynamics: parseMetricValue(row, ["Price Dynamics", "Динамика цен", "price_dynamics"]),
            DeliveryTime: parseMetricValue(row, ["Delivery Time (days)", "Время доставки (дни)", "delivery_time"]),
            OrdersInTransit: parseMetricValue(row, ["Orders in Transit", "Заказы в пути", "orders_in_transit"]),
            Returns: parseMetricValue(row, ["Returns", "Возвраты", "return_count"]),
            RepeatPurchases: parseMetricValue(row, ["Repeat Purchases", "Повторные покупки", "repeat_purchases"]),
            ReviewsRatings: parseMetricValue(row, ["Reviews and Ratings", "Отзывы и рейтинги", "reviews"]),
            NPS: parseMetricValue(row, ["NPS", "НПС"]),
          }
        })

        console.log("Parsed data:", parsed)
        setData(parsed)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Ошибка загрузки данных. Пожалуйста, проверьте консоль для деталей.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper function to parse metric values with multiple possible field names
  const parseMetricValue = (row: RawMetricRow, possibleKeys: string[]): number => {
    for (const key of possibleKeys) {
      if (row[key] !== undefined && row[key] !== null) {
        const value = Number(row[key])
        return isNaN(value) ? 0 : value
      }
    }
    return 0
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Загрузка данных...</h1>
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c1442]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Ошибка</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <p>{error}</p>
          <p className="mt-2">
            Пожалуйста, убедитесь, что вы загрузили файл с данными на странице{" "}
            <a href="/integrations/data-sources" className="text-blue-800 underline">
              Источники данных
            </a>
          </p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Графики Метрик</h1>
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
          <p>Нет данных для отображения.</p>
          <p className="mt-2">
            Пожалуйста, загрузите файл с данными на странице{" "}
            <a href="/integrations/data-sources" className="text-blue-800 underline">
              Источники данных
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Графики Метрик</h1>

      <Tabs defaultValue="line" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="line">Линейные графики</TabsTrigger>
          <TabsTrigger value="bar">Столбцы</TabsTrigger>
        </TabsList>

        {/* Линейные графики */}
        <TabsContent value="line">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Объем продаж и GMV</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="SalesVolume" stroke="#0c1442" name="Объем продаж" />
                    <Line type="monotone" dataKey="GMV" stroke="#9ca3af" name="GMV" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Средняя цена и Средний чек</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="AveragePrice" stroke="#0c1442" name="Средняя цена" />
                    <Line type="monotone" dataKey="AverageCheck" stroke="#9ca3af" name="Средний чек" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Конверсия</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ConversionRate" stroke="#0c1442" name="Конверсия" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Столбчатые графики */}
        <TabsContent value="bar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Количество заказов и возвратов</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Orders" fill="#0c1442" name="Заказы" />
                    <Bar dataKey="Returns" fill="#9ca3af" name="Возвраты" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Маржа и NPS</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Margin" fill="#0c1442" name="Маржа (%)" />
                    <Bar dataKey="NPS" fill="#9ca3af" name="NPS" />
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
