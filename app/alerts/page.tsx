"use client"

import { useState, useEffect } from "react"
import { BackButton } from "@/components/back-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Info, CheckCircle, X, Clock, Satellite, Shield, Activity, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface Alert {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  source: string
  icon: any
  acknowledged: boolean
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      title: "Debris Collision Risk",
      message: "High probability collision detected with object 2023-001A. Immediate evasive maneuver required.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      source: "Debris Monitoring",
      icon: Shield,
      acknowledged: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Solar Storm Activity",
      message: "Moderate geomagnetic storm conditions detected. Monitor crew radiation exposure.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      source: "Space Weather",
      icon: Zap,
      acknowledged: false,
    },
    {
      id: "3",
      type: "info",
      title: "Telemetry Update",
      message: "Spacecraft systems nominal. All parameters within acceptable ranges.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      source: "Spacecraft Telemetry",
      icon: Satellite,
      acknowledged: true,
    },
    {
      id: "4",
      type: "warning",
      title: "Crew Health Alert",
      message: "Astronaut vitals showing elevated stress indicators. Recommend rest period.",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      source: "Health Monitoring",
      icon: Activity,
      acknowledged: false,
    },
  ])

  const [filter, setFilter] = useState<"all" | "unacknowledged" | "critical">("all")

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlerts = [
        {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? "critical" : Math.random() > 0.5 ? "warning" : "info",
          title: "System Update",
          message: "New telemetry data received from orbital sensors.",
          timestamp: new Date(),
          source: "Mission Control",
          icon: Info,
          acknowledged: false,
        },
      ]

      setAlerts((prev) => [newAlerts[0] as Alert, ...prev.slice(0, 9)])
    }, 30000) // Add new alert every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "unacknowledged") return !alert.acknowledged
    if (filter === "critical") return alert.type === "critical"
    return true
  })

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-500/10"
      case "warning":
        return "border-yellow-500 bg-yellow-500/10"
      case "info":
        return "border-blue-500 bg-blue-500/10"
      case "success":
        return "border-green-500 bg-green-500/10"
      default:
        return "border-gray-500 bg-gray-500/10"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <BackButton />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mission Alerts</h1>
              <p className="text-gray-600 dark:text-gray-400">Real-time system notifications and warnings</p>
            </div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="text-sm"
          >
            All Alerts ({alerts.length})
          </Button>
          <Button
            variant={filter === "unacknowledged" ? "default" : "outline"}
            onClick={() => setFilter("unacknowledged")}
            className="text-sm"
          >
            Unacknowledged ({alerts.filter((a) => !a.acknowledged).length})
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            onClick={() => setFilter("critical")}
            className="text-sm"
          >
            Critical ({alerts.filter((a) => a.type === "critical").length})
          </Button>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => {
            const IconComponent = alert.icon
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className={`${getAlertColor(alert.type)} border-l-4 ${alert.acknowledged ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-lg ${getAlertColor(alert.type)} flex items-center justify-center`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{alert.title}</CardTitle>
                            <Badge className={getBadgeColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                            {alert.acknowledged && (
                              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                ACKNOWLEDGED
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(alert.timestamp)}
                            </span>
                            <span>{alert.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                          className="text-xs text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{alert.message}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No alerts found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === "all" ? "All systems are operating normally." : `No ${filter} alerts at this time.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
