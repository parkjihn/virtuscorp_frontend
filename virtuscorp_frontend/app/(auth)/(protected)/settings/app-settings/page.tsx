"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Application Settings</h1>
      <p className="text-gray-600 mb-6">Manage your preferences and application configurations.</p>

      <Card className="border shadow-sm">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>

            <div className="mb-4">
              <label className="block text-sm mb-1">Language</label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>English</option>
                <option>Русский</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Time Zone</label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>GMT</option>
                <option>UTC+3 (Moscow)</option>
                <option>UTC-5 (Eastern)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Theme</label>
              <div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="bg-[#0c1442] data-[state=unchecked]:bg-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Integration Settings</h2>
            <Button className="bg-[#0c1442] hover:bg-[#0c1442]/90 text-white font-medium">Add Integration</Button>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Account Management</h2>
            <div className="space-y-2">
              <Button className="w-full sm:w-auto bg-[#0c1442] hover:bg-[#0c1442]/90 text-white font-medium">
                Change password
              </Button>
              <div>
                <Button className="w-full sm:w-auto bg-[#0c1442] hover:bg-[#0c1442]/90 text-white font-medium">
                  Delete account
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" className="bg-gray-200 hover:bg-gray-300 border-gray-300 text-gray-700 px-8">
              Cancel
            </Button>
            <Button className="bg-[#0c1442] hover:bg-[#0c1442]/90 text-white px-8">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

