"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share, ArrowLeft, AlertCircle } from "lucide-react"
import axios from "axios"

interface Report {
  id: number
  title: string
  created_at: string
  report_type: string
  status: string
  filters_applied: string
  export_format: string
  file_path: string | null
}

export default function ViewReportPage() {
  const params = useParams()
  const router = useRouter()
  const reportId = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!reportId) return

    const fetchReport = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get the auth token
        const authToken =
          localStorage.getItem("auth-token") ||
          document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

        // Fetch the report details
        const response = await axios.get(`https://api.virtuscorp.site/api/reports/${reportId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": authToken,
          },
        })

        setReport(response.data)

        // Fetch the PDF for preview
        const pdfResponse = await axios.get(`https://api.virtuscorp.site/api/reports/${reportId}/download`, {
          headers: {
            "x-auth-token": authToken,
          },
          responseType: "blob",
        })

        // Create a URL for the PDF blob
        const url = window.URL.createObjectURL(new Blob([pdfResponse.data], { type: "application/pdf" }))
        setPdfUrl(url)
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchReport()

    // Cleanup function to revoke object URLs
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [reportId])

  const downloadReport = async () => {
    try {
      // Get the auth token
      const authToken =
        localStorage.getItem("auth-token") ||
        document.cookie.replace(/(?:(?:^|.*;\s*)auth-token\s*=\s*([^;]*).*$)|^.*$/, "$1")

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

  const shareReport = async () => {
    try {
      if (!report) return

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

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Loading report...</h1>
        <div className="w-full h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c1442]"></div>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-[#0c1442] mb-4">Error</h1>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center text-red-500 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <p>{error || "Report not found"}</p>
            </div>
            <Button onClick={() => router.push("/view-report/generated")} className="bg-[#0c1442]">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0c1442]">{report.title}</h1>
          <p className="text-gray-500">Created: {new Date(report.created_at).toLocaleString()}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => router.push("/view-report/generated")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Reports
          </Button>
          <Button variant="outline" onClick={downloadReport}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button variant="outline" onClick={shareReport}>
            <Share className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Report Type</p>
              <p className="text-lg">
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
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="text-lg">{report.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Format</p>
              <p className="text-lg">{report.export_format.toUpperCase()}</p>
            </div>
            {report.filters_applied && (
              <div>
                <p className="text-sm font-medium text-gray-500">Filters Applied</p>
                <p className="text-lg">{report.filters_applied}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {pdfUrl ? (
            <div className="w-full h-[800px] border border-gray-200 rounded-md overflow-hidden">
              <iframe src={`${pdfUrl}#toolbar=0`} className="w-full h-full" title="PDF Preview" />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center border border-gray-200 rounded-md">
              <p className="text-gray-500">PDF preview not available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
