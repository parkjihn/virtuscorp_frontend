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

// ОПРЕДЕЛЯЕМ тип того, что нам приходит с сервера
interface RawMetricRow {
  [key: string]: string | number | null
}

// ОПРЕДЕЛЯЕМ тип уже чистых данных для графиков
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/uploaded-data")
        const raw: RawMetricRow[] = res.data.data || []

        const parsed: MetricRow[] = raw.map((row) => ({
          Date: String(row["Date"]),
          Orders: Number(row["Orders"] || 0),
          SalesVolume: Number(row["Sales Volume"] || 0),
          AverageCheck: Number(row["Average Check (AOV)"] || 0),
          ConversionRate: Number(row["Conversion Rate (%)"] || 0),
          GMV: Number(row["GMV"] || 0),
          AveragePrice: Number(row["Average Price"] || 0),
          Margin: Number(row["Margin (%)"] || 0),
          PriceDynamics: Number(row["Price Dynamics"] || 0),
          DeliveryTime: Number(row["Delivery Time (days)"] || 0),
          OrdersInTransit: Number(row["Orders in Transit"] || 0),
          Returns: Number(row["Returns"] || 0),
          RepeatPurchases: Number(row["Repeat Purchases"] || 0),
          ReviewsRatings: Number(row["Reviews and Ratings"] || 0),
          NPS: Number(row["NPS"] || 0),
        }))

        setData(parsed)
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      }
    }

    fetchData()
  }, [])

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
              <CardHeader><CardTitle>Объем продаж и GMV</CardTitle></CardHeader>
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
              <CardHeader><CardTitle>Средняя цена и Средний чек</CardTitle></CardHeader>
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
              <CardHeader><CardTitle>Конверсия</CardTitle></CardHeader>
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
              <CardHeader><CardTitle>Количество заказов и возвратов</CardTitle></CardHeader>
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

          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
