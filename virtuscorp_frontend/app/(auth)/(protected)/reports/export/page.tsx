"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function ExportPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [reportType, setReportType] = useState("financial")
  const [dateRange, setDateRange] = useState("")
  const [filters, setFilters] = useState("")
  const [excludeTaxes, setExcludeTaxes] = useState(false)
  const [showProfit, setShowProfit] = useState(false)
  const [exportFormat, setExportFormat] = useState("pdf")
  const [fileNaming, setFileNaming] = useState("По умолчанию: Тип_Отчета_Дата")
  const [downloadToDevice, setDownloadToDevice] = useState(true)
  const [combineReports, setCombineReports] = useState(false)
  const [error, setError] = useState("")

  const handleCreateReport = async () => {
    try {
      setIsLoading(true)
      setError("")

      // Получаем токен из localStorage или куки
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      // Формируем данные для запроса
      const reportData = {
        report_type: reportType,
        date_range: dateRange,
        filters: filters,
        exclude_taxes: excludeTaxes,
        show_profit_margin: showProfit,
        export_format: exportFormat,
        file_naming: fileNaming,
        download_to_device: downloadToDevice,
        combine_reports: combineReports,
      }

      // Отправляем запрос на создание отчета
      const response = await axios.post("/api/reports/generate", reportData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        responseType: "blob", // Важно для получения бинарных данных (PDF)
      })

      // Создаем ссылку для скачивания файла
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url

      // Получаем имя файла из заголовков ответа или используем стандартное
      const contentDisposition = response.headers["content-disposition"]
      let filename = "report.pdf"

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch.length === 2) filename = filenameMatch[1]
      }

      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      // Перенаправляем на страницу сгенерированных отчетов
      router.push("/view-report/generated")
    } catch (err) {
      console.error("Ошибка при создании отчета:", err)
      setError("Произошла ошибка при создании отчета. Пожалуйста, попробуйте снова.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold text-[#0c1442] mb-2">Экспорт отчетов</h1>
          <p className="text-gray-600 mb-8">Создавайте и настраивайте отчеты для ваших бизнес-потребностей.</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 1: Выберите тип отчета</h2>
              <div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Финансовая сводка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Финансовая сводка</SelectItem>
                    <SelectItem value="sales">Отчет по продажам</SelectItem>
                    <SelectItem value="inventory">Отчет по инвентарю</SelectItem>
                    <SelectItem value="marketing">Маркетинговая аналитика</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="combine"
                  checked={combineReports}
                  onCheckedChange={(checked) => setCombineReports(!!checked)}
                />
                <Label htmlFor="combine">Объединить несколько отчетов в один файл</Label>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 2: Настройте данные</h2>

              <div className="space-y-2">
                <Label htmlFor="date-range">Выбор диапазона дат</Label>
                <Input
                  id="date-range"
                  placeholder="ДД-ММ-ГГГГ"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filters">Фильтры</Label>
                <Input
                  id="filters"
                  placeholder="например, регионы, продукты"
                  value={filters}
                  onChange={(e) => setFilters(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclude-taxes"
                    checked={excludeTaxes}
                    onCheckedChange={(checked) => setExcludeTaxes(!!checked)}
                  />
                  <Label htmlFor="exclude-taxes">Исключить налоги</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-profit"
                    checked={showProfit}
                    onCheckedChange={(checked) => setShowProfit(!!checked)}
                  />
                  <Label htmlFor="show-profit">Показать маржу прибыли</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 3: Выберите формат экспорта</h2>
              <div>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="PDF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Шаг 4: Настройки экспорта</h2>

              <div className="space-y-2">
                <Label htmlFor="file-naming">Соглашение об именовании файлов</Label>
                <Input
                  id="file-naming"
                  placeholder="По умолчанию: Тип_Отчета_Дата"
                  value={fileNaming}
                  onChange={(e) => setFileNaming(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Варианты назначения</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="download"
                    checked={downloadToDevice}
                    onCheckedChange={(checked) => setDownloadToDevice(!!checked)}
                  />
                  <Label htmlFor="download">Скачать на устройство</Label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full md:w-auto bg-[#0c1442]" onClick={handleCreateReport} disabled={isLoading}>
                {isLoading ? "Создание отчета..." : "Создать отчет"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
