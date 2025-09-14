"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Satellite, Bell, Settings, Globe, Clock, Volume2, Shield, Monitor } from "lucide-react"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const getCurrentIST = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-IN", {
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
  }

  const settingsCategories = [
    {
      title: "Display Settings",
      description: "Customize the appearance and theme of the interface",
      icon: Monitor,
      settings: [
        {
          name: "Dark Mode",
          description: "Use dark theme for better visibility",
          value: isDarkMode,
          onChange: toggleDarkMode,
        },
        {
          name: "Auto Refresh",
          description: "Automatically update mission data",
          value: autoRefresh,
          onChange: setAutoRefresh,
        },
      ],
    },
    {
      title: "Alert Preferences",
      description: "Configure notification and alert settings",
      icon: Bell,
      settings: [
        {
          name: "Push Notifications",
          description: "Receive critical mission alerts",
          value: notifications,
          onChange: setNotifications,
        },
        {
          name: "Sound Alerts",
          description: "Audio alerts for urgent notifications",
          value: soundAlerts,
          onChange: setSoundAlerts,
        },
      ],
    },
    {
      title: "Regional Settings",
      description: "Language and timezone preferences",
      icon: Globe,
      settings: [
        {
          name: "Language",
          description: "Interface language",
          value: "English",
          type: "select",
          options: ["English", "Hindi"],
        },
        {
          name: "Timezone",
          description: "Display timezone",
          value: "IST (UTC+5:30)",
          type: "select",
          options: ["IST (UTC+5:30)", "UTC"],
        },
      ],
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <CollapsibleSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <nav
        className={`border-b backdrop-blur-sm transition-colors duration-300 ${
          isDarkMode ? "border-gray-800/50 bg-gray-950/50" : "border-gray-200/50 bg-white/50"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 ml-16">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Satellite className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-medium">SPACE OPS</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-600 text-white border border-orange-500">MISSION READY</Badge>
              <div className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pl-0">
        <header
          className={`border-b transition-colors duration-300 ${
            isDarkMode
              ? "border-gray-800/50 bg-gradient-to-r from-gray-950 to-gray-900"
              : "border-gray-200/50 bg-gradient-to-r from-white to-gray-50"
          }`}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-light mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  System Settings
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Configure mission control preferences and alerts
                </p>
              </div>
              <div className="text-right">
                <div className={`text-xs uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Current Time IST
                </div>
                <div className={`text-lg font-mono ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {getCurrentIST()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {settingsCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.title}
                  className={`transition-all duration-300 backdrop-blur-sm ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-800/50 hover:border-gray-700/50"
                      : "bg-gradient-to-br from-white to-gray-50 border-gray-200/50 hover:border-gray-300/50"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-lg border ${
                          isDarkMode ? "border-orange-500/30 text-orange-400" : "border-orange-500/50 text-orange-600"
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className={`text-xl font-light ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {category.title}
                        </CardTitle>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {category.settings.map((setting) => (
                        <div key={setting.name} className="flex items-center justify-between">
                          <div>
                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                              {setting.name}
                            </div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {setting.description}
                            </div>
                          </div>
                          {setting.type === "select" ? (
                            <select
                              className={`text-xs px-2 py-1 rounded border ${
                                isDarkMode
                                  ? "bg-gray-800 border-gray-700 text-white"
                                  : "bg-white border-gray-300 text-gray-900"
                              }`}
                              defaultValue={setting.value}
                            >
                              {setting.options?.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <Switch
                              checked={setting.value as boolean}
                              onCheckedChange={setting.onChange as (checked: boolean) => void}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className={`text-xl font-light mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className={`h-20 flex flex-col gap-2 ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">Reset Alerts</span>
              </Button>
              <Button
                variant="outline"
                className={`h-20 flex flex-col gap-2 ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <Clock className="h-5 w-5" />
                <span className="text-xs">Sync Time</span>
              </Button>
              <Button
                variant="outline"
                className={`h-20 flex flex-col gap-2 ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <Volume2 className="h-5 w-5" />
                <span className="text-xs">Test Audio</span>
              </Button>
              <Button
                variant="outline"
                className={`h-20 flex flex-col gap-2 ${
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-800 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="text-xs">System Check</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
