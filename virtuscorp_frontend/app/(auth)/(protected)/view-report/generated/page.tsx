"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

interface Report {
  id: number
  title: string
  created_at: string
  report_type: string
  status: string
  file_url: string | null
}

export default function GeneratedReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [reportTypeFilter, setReportTypeFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)

      // Получаем токен из localStorage или куки
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      const response = await axios.get("/api/reports", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      })

      setReports(response.data)
    } catch (err) {
      console.error("Ошибка при загрузке отчетов:", err)
      setError("Не удалось загрузить отчеты. Пожалуйста, попробуйте позже.")
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = async (reportId: number) => {
    try {
      // В реальном приложении здесь будет запрос на скачивание отчета
      alert(`Скачивание отчета с ID: ${reportId}`)
    } catch (err) {
      console.error("Ошибка при скачивании отчета:", err)
    }
  }

  const shareReport = (reportId: number) => {
    // В реальном приложении здесь будет функционал для шаринга
    alert(`Поделиться отчетом с ID: ${reportId}`)
  }

  // Фильтрация отчетов
  const filteredReports = reports.filter((report) => {
    const matchesSearch = searchTerm === "" || report.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = reportTypeFilter === "" || report.report_type === reportTypeFilter

    const matchesStatus = statusFilter === "" || report.status === statusFilter

    // Здесь можно добавить фильтрацию по дате

    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-[#0c1442] mb-6">Загрузка отчетов...</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c1442]"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-[#0c1442] mb-6">Сформированные отчеты</h1>

      <Card className="p-6">
        <p className="text-gray-600 mb-4">Получите доступ и управляйте всеми вашими отчетами в одном месте.</p>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Input
              placeholder="Поиск по названию, типу или дате"
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Тип отчета" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="financial">Финансовая сводка</SelectItem>
                <SelectItem value="sales">Отчет по продажам</SelectItem>
                <SelectItem value="inventory">Отчет по инвентарю</SelectItem>
                <SelectItem value="marketing">Маркетинговая аналитика</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Дата создания" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все даты</SelectItem>
                <SelectItem value="newest">Сначала новые</SelectItem>
                <SelectItem value="oldest">Сначала старые</SelectItem>
                <SelectItem value="last-week">За последнюю неделю</SelectItem>
                <SelectItem value="last-month">За последний месяц</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="completed">Завершен</SelectItem>
                <SelectItem value="in-progress">В процессе</SelectItem>
                <SelectItem value="failed">Ошибка</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Отчеты не найдены</p>
              <Button className="mt-4 bg-[#0c1442]" onClick={() => (window.location.href = "/reports/export")}>
                Создать новый отчет
              </Button>
            </div>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">Создан: {new Date(report.created_at).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      Тип:{" "}
                      {report.report_type === "financial"
                        ? "Финансовая сводка"
                        : report.report_type === "sales"
                          ? "Отчет по продажам"
                          : report.report_type === "inventory"
                            ? "Отчет по инвентарю"
                            : report.report_type === "marketing"
                              ? "Маркетинговая аналитика"
                              : report.report_type}
                    </p>
                    <div className="flex items-center">
                      {report.status === "completed" ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm">Статус: Завершен</span>
                        </>
                      ) : report.status === "in-progress" ? (
                        <>
                          <Clock className="h-5 w-5 text-amber-500 mr-2" />
                          <span className="text-sm">Статус: В процессе</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          <span className="text-sm">Статус: Ошибка</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <Button
                      className="bg-[#0c1442]"
                      disabled={report.status !== "completed"}
                      onClick={() => (window.location.href = `/view-report/${report.id}`)}
                    >
                      Просмотр отчета
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => downloadReport(report.id)}
                      disabled={report.status !== "completed"}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => shareReport(report.id)}
                      disabled={report.status !== "completed"}
                    >
                      Поделиться
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}
