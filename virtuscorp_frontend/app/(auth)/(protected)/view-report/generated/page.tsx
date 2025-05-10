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

      // Get the auth token from localStorage or cookies
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      const response = await axios.get("https://api.virtuscorp.site/api/reports", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      })

      console.log("Reports data:", response.data)
      setReports(response.data)
    } catch (err) {
      console.error("Error loading reports:", err)
      setError("Failed to load reports. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = async (reportId: number) => {
    try {
      // Get the auth token
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      console.log(`Downloading report with ID: ${reportId}`)

      // Make the actual request to download the report
      const response = await axios.get(`https://api.virtuscorp.site/api/reports/${reportId}/download`, {
        headers: {
          "x-auth-token": authToken,
        },
        responseType: "blob",
      })

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url

      // Get filename from content-disposition header if available
      const contentDisposition = response.headers["content-disposition"]
      let filename = `report-${reportId}.pdf`

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch && filenameMatch.length === 2) {
          filename = filenameMatch[1]
        }
      }

      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()

      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        link.remove()
      }, 100)
    } catch (err) {
      console.error("Error downloading report:", err)
      alert("Error downloading report. Please try again.")
    }
  }

  const shareReport = async (reportId: number) => {
    try {
      // Get the auth token
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      // Get the report details to share
      const response = await axios.get(`https://api.virtuscorp.site/api/reports/${reportId}`, {
        headers: {
          "x-auth-token": authToken,
        },
      })

      const report = response.data

      // Create a shareable link or message
      const shareText = `Report: ${report.title} (Created: ${new Date(report.created_at).toLocaleString()})`
      const shareUrl = `${window.location.origin}/view-report/${reportId}`

      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: report.title,
          text: shareText,
          url: shareUrl,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        // Copy to clipboard
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        alert("Report link copied to clipboard!")
      }
    } catch (err) {
      console.error("Error sharing report:", err)
      alert("Error sharing report. Please try again.")
    }
  }

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch = searchTerm === "" || report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = reportTypeFilter === "" || report.report_type === reportTypeFilter
    const matchesStatus = statusFilter === "" || report.status === statusFilter

    // Date filtering would be implemented here
    // For now, we'll just return true for date filtering
    const matchesDate = dateFilter === "" || true

    return matchesSearch && matchesType && matchesStatus && matchesDate
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
      <h1 className="text-3xl font-bold text-[#0c1442] mb-6">Сгенерированные Отчеты</h1>

      <Card className="p-6">
        <p className="text-gray-600 mb-4">Доступ и управление всеми вашими отчетами в одном месте.</p>

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
                <SelectItem value="all">Все Типы</SelectItem>
                <SelectItem value="financial">Финансовое резюме</SelectItem>
                <SelectItem value="sales">Отчет о продажах</SelectItem>
                <SelectItem value="inventory">Инвентарный отчет</SelectItem>
                <SelectItem value="marketing">Маркетинг Аналитика</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Дата создания" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все Даты</SelectItem>
                <SelectItem value="newest">Новейший Первый</SelectItem>
                <SelectItem value="oldest">Старейший Первый</SelectItem>
                <SelectItem value="last-week">Последняя Неделя</SelectItem>
                <SelectItem value="last-month">Последний Месяц</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все Статусы</SelectItem>
                <SelectItem value="completed">Завершено</SelectItem>
                <SelectItem value="in-progress">В Прогрессе</SelectItem>
                <SelectItem value="failed">Неудачный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Отчетов не найдено</p>
              <Button className="mt-4 bg-[#0c1442]" onClick={() => (window.location.href = "/reports/export")}>
              Создать Новый Отчет
              </Button>
            </div>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">Создано: {new Date(report.created_at).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      Type:{" "}
                      {report.report_type === "financial"
                        ? "Financial Summary"
                        : report.report_type === "sales"
                          ? "Sales Report"
                          : report.report_type === "inventory"
                            ? "Inventory Report"
                            : report.report_type === "marketing"
                              ? "Marketing Analytics"
                              : report.report_type}
                    </p>
                    <div className="flex items-center">
                      {report.status === "completed" ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span className="text-sm">Статус: Завершено</span>
                        </>
                      ) : report.status === "in-progress" ? (
                        <>
                          <Clock className="h-5 w-5 text-amber-500 mr-2" />
                          <span className="text-sm">Статус: В прогрессе</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          <span className="text-sm">Статус: Неудачно</span>
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
                      Просмотр Отчета
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
