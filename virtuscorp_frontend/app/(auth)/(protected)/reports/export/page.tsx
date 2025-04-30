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

      // Get the auth token from localStorage or cookies
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

      // Prepare report data
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

      console.log("Sending report data:", reportData)

      // Send request to create report
      const response = await axios.post("https://api.virtuscorp.site/api/reports/generate", reportData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        responseType: "blob", // Important for receiving binary data (PDF)
      })

      console.log("Report generation successful")

      // Create a download link for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url

      // Get filename from response headers or use default
      const contentDisposition = response.headers["content-disposition"]
      let filename = "report.pdf"

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch && filenameMatch.length === 2) filename = filenameMatch[1]
      }

      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      // Redirect to generated reports page
      router.push("/view-report/generated")
    } catch (err) {
      console.error("Error creating report:", err)
      setError("An error occurred while creating the report. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <h1 className="text-4xl font-bold text-[#0c1442] mb-2">Export Reports</h1>
          <p className="text-gray-600 mb-8">Create and customize reports for your business needs.</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">{error}</div>}

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Step 1: Choose Report Type</h2>
              <div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Financial Summary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial Summary</SelectItem>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="inventory">Inventory Report</SelectItem>
                    <SelectItem value="marketing">Marketing Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="combine"
                  checked={combineReports}
                  onCheckedChange={(checked) => setCombineReports(!!checked)}
                />
                <Label htmlFor="combine">Combine multiple reports into one file</Label>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Step 2: Configure Data</h2>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range Selection</Label>
                <Input
                  id="date-range"
                  placeholder="DD-MM-YYYY"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filters">Filters</Label>
                <Input
                  id="filters"
                  placeholder="e.g., regions, products"
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
                  <Label htmlFor="exclude-taxes">Exclude Taxes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-profit"
                    checked={showProfit}
                    onCheckedChange={(checked) => setShowProfit(!!checked)}
                  />
                  <Label htmlFor="show-profit">Show Profit Margin</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0c1442]">Step 3: Choose Export Format</h2>
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
              <h2 className="text-2xl font-bold text-[#0c1442]">Step 4: Export Settings</h2>

              <div className="space-y-2">
                <Label htmlFor="file-naming">File Naming Convention</Label>
                <Input
                  id="file-naming"
                  placeholder="Default: Report_Type_Date"
                  value={fileNaming}
                  onChange={(e) => setFileNaming(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Destination Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="download"
                    checked={downloadToDevice}
                    onCheckedChange={(checked) => setDownloadToDevice(!!checked)}
                  />
                  <Label htmlFor="download">Download to Device</Label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full md:w-auto bg-[#0c1442]" onClick={handleCreateReport} disabled={isLoading}>
                {isLoading ? "Creating Report..." : "Create Report"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
