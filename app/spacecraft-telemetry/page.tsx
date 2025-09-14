"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radar, Battery, Thermometer, Zap, Satellite, Play, Brain, Download } from "lucide-react"

export default function SpacecraftTelemetryPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedSpacecraft, setSelectedSpacecraft] = useState("Sentinel-2A")
  const [isAutonomousMode, setIsAutonomousMode] = useState(true)
  const [telemetryData, setTelemetryData] = useState({})

  const [spacecraftList, setSpacecraftList] = useState([
    { name: "Sentinel-2A", type: "Earth Observation", status: "Operational", health: 98, anomalies: 1 },
    { name: "NOAA-21", type: "Weather Satellite", status: "Caution", health: 87, anomalies: 3 },
    { name: "Hubble Telescope", type: "Observatory", status: "Operational", health: 94, anomalies: 0 },
  ])

  const [anomalies, setAnomalies] = useState([
    {
      id: "ANOM-2025-001",
      spacecraft: "Sentinel-2A",
      subsystem: "Power",
      type: "Battery Temp Rise",
      severity: "Medium",
      recommendation: "Reduce power consumption, activate thermal management.",
      autoAction: "Thermal control activated",
      status: "Mitigated",
    },
    {
      id: "ANOM-2025-002",
      spacecraft: "NOAA-21",
      subsystem: "Attitude",
      type: "Gyroscope Drift",
      severity: "Low",
      recommendation: "Switch to backup gyroscope.",
      autoAction: "Backup gyro activated",
      status: "Resolved",
    },
    {
      id: "ANOM-2025-003",
      spacecraft: "NOAA-21",
      subsystem: "Comms",
      type: "Signal Degradation",
      severity: "High",
      recommendation: "Antenna pointing adjustment required.",
      autoAction: "Pending operator approval",
      status: "Active",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Update spacecraft health metrics
      setSpacecraftList((prev) =>
        prev.map((sc) => ({
          ...sc,
          health: Math.max(85, Math.min(99, sc.health + (Math.random() - 0.5) * 2)),
          anomalies: Math.max(0, sc.anomalies + Math.floor((Math.random() - 0.8) * 2)),
        })),
      )

      // Update telemetry data if available
      if (Object.keys(telemetryData).length > 0) {
        setTelemetryData((prev) => ({
          power: {
            ...prev.power,
            batteryLevel: Math.max(85, Math.min(100, Math.round(prev.power.batteryLevel + (Math.random() - 0.5) * 3))),
            solarPanelOutput: Number.parseFloat(
              Math.max(2.0, Math.min(2.8, prev.power.solarPanelOutput + (Math.random() - 0.5) * 0.2)).toFixed(1),
            ),
            powerConsumption: Number.parseFloat(
              Math.max(1.5, Math.min(2.2, prev.power.powerConsumption + (Math.random() - 0.5) * 0.1)).toFixed(1),
            ),
          },
          thermal: {
            ...prev.thermal,
            cpuTemperature: Number.parseFloat(
              Math.max(35, Math.min(50, prev.thermal.cpuTemperature + (Math.random() - 0.5) * 2)).toFixed(1),
            ),
            instrumentTemperature: Number.parseFloat(
              Math.max(20, Math.min(25, prev.thermal.instrumentTemperature + (Math.random() - 0.5) * 0.5)).toFixed(1),
            ),
          },
          attitude: {
            ...prev.attitude,
            roll: Number.parseFloat((prev.attitude.roll + (Math.random() - 0.5) * 0.1).toFixed(1)),
            pitch: Number.parseFloat((prev.attitude.pitch + (Math.random() - 0.5) * 0.1).toFixed(1)),
            yaw: Number.parseFloat((prev.attitude.yaw + (Math.random() - 0.5) * 0.1).toFixed(1)),
            pointingAccuracy: Number.parseFloat(
              Math.max(98, Math.min(99.9, prev.attitude.pointingAccuracy + (Math.random() - 0.5) * 0.2)).toFixed(1),
            ),
          },
          communication: {
            ...prev.communication,
            signalStrength: Number.parseFloat(
              Math.max(-95, Math.min(-75, prev.communication.signalStrength + (Math.random() - 0.5) * 3)).toFixed(1),
            ),
            dataRate: Number.parseFloat(
              Math.max(120, Math.min(180, prev.communication.dataRate + (Math.random() - 0.5) * 10)).toFixed(1),
            ),
          },
        }))
      }
    }, 8000) // Update every 8 seconds

    return () => clearInterval(interval)
  }, [telemetryData])

  const predictiveAlerts = [
    { component: "Solar Panel Array #1", prediction: "Degradation expected in 45 days", confidence: 87 },
    { component: "Reaction Wheel #3", prediction: "Bearing wear detected", confidence: 92 },
    { component: "Transponder Unit", prediction: "Performance decline trend", confidence: 78 },
  ]

  // --- Data Simulation on selection change ---
  useEffect(() => {
    // This simulates fetching new data when a different spacecraft is selected
    const generateRandomTelemetry = (base) => ({
      power: {
        batteryLevel: Math.round(base + 5),
        solarPanelOutput: Number.parseFloat((2.4).toFixed(1)),
        powerConsumption: Number.parseFloat((1.8).toFixed(1)),
        chargingStatus: "Charging",
      },
      thermal: {
        cpuTemperature: Number.parseFloat((40 + base).toFixed(1)),
        instrumentTemperature: Number.parseFloat((22.1).toFixed(1)),
        thermalStatus: "Nominal",
      },
      attitude: {
        roll: Number.parseFloat((0.2).toFixed(1)),
        pitch: Number.parseFloat((-0.1).toFixed(1)),
        yaw: Number.parseFloat((0.05).toFixed(1)),
        pointingAccuracy: Number.parseFloat((99.8 - base / 10).toFixed(1)),
      },
      communication: {
        signalStrength: Number.parseFloat((-85 + Math.abs(base)).toFixed(1)),
        dataRate: Number.parseFloat((150 + Math.abs(base)).toFixed(1)),
        uplinkStatus: "Active",
      },
    })

    const scData = spacecraftList.find((sc) => sc.name === selectedSpacecraft)
    setTelemetryData(generateRandomTelemetry(scData.health > 90 ? 2 : 10))
  }, [selectedSpacecraft])

  // --- Functional Logic ---
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const handleAnomalyAction = (id) => {
    setAnomalies(
      anomalies.map((anom) =>
        anom.id === id ? { ...anom, status: "Resolved", autoAction: "Manual override: Action executed." } : anom,
      ),
    )
    window.alert(`Executing recommended action for anomaly ${id}.`)
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify({ spacecraft: selectedSpacecraft, telemetry: telemetryData, anomalies }, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedSpacecraft}_telemetry_export.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // --- Styling ---
  const getSeverityColor = (severity) => {
    if (severity === "High") return "bg-red-500 text-white"
    if (severity === "Medium") return "bg-yellow-500 text-black"
    return "bg-blue-500 text-white"
  }

  const getStatusColor = (status) => {
    if (status === "Operational") return "bg-green-500 text-white"
    if (status === "Caution") return "bg-yellow-500 text-black"
    return "bg-gray-500 text-white"
  }

  const cardClasses = isDarkMode ? "bg-gray-950/50 border-gray-800/50" : "bg-white border-gray-200"
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900"
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-600"
  const buttonPrimaryClasses = "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
  const buttonOutlineClasses = isDarkMode
    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
    : "border-gray-300 text-gray-700 hover:bg-gray-100"
  const tabsListClasses = isDarkMode ? "bg-gray-900" : "bg-gray-200"
  const tabsTriggerClasses = isDarkMode
    ? "data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-400"
    : "data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-600"
  const itemRowClasses = isDarkMode ? "bg-gray-900/60 border-gray-800/70" : "bg-gray-50 border-gray-200"

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <CollapsibleSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-b backdrop-blur-sm transition-colors duration-300 ${isDarkMode ? "border-gray-800/50 bg-gray-950/50" : "border-gray-200/50 bg-white/50"}`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ml-16">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/space-logo-large.png"
                  alt="OrbitX6"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-medium">OrbitX6</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={isAutonomousMode ? "border-green-400 text-green-400" : "border-yellow-400 text-yellow-400"}
              >
                {isAutonomousMode ? "AI Autonomous" : "Manual Mode"}
              </Badge>
              <Button size="sm" onClick={() => setIsAutonomousMode(!isAutonomousMode)} className={buttonPrimaryClasses}>
                <Brain className="h-4 w-4 mr-2" />
                {isAutonomousMode ? "Disable AI" : "Enable AI"}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="pl-0">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`border-b transition-colors duration-300 ${isDarkMode ? "border-gray-800/50 bg-gradient-to-r from-gray-950 to-gray-900" : "border-gray-200/50 bg-gradient-to-r from-white to-gray-50"}`}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-light mb-2 ${textPrimary}`}>Spacecraft Telemetry Analysis</h1>
                <p className={textSecondary}>Autonomous Fault Detection & Management</p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className={tabsListClasses}>
              <TabsTrigger value="overview" className={tabsTriggerClasses}>
                Fleet Overview
              </TabsTrigger>
              <TabsTrigger value="telemetry" className={tabsTriggerClasses}>
                Live Telemetry
              </TabsTrigger>
              <TabsTrigger value="anomalies" className={tabsTriggerClasses}>
                Anomaly Detection
              </TabsTrigger>
              <TabsTrigger value="predictive" className={tabsTriggerClasses}>
                Predictive Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {spacecraftList.map((sc) => (
                <Card key={sc.name} className={cardClasses}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Satellite className="h-6 w-6 text-orange-500" />
                        <div>
                          <CardTitle className={textPrimary}>{sc.name}</CardTitle>
                          <CardDescription className={textSecondary}>{sc.type}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`text-sm ${textSecondary}`}>Health</p>
                          <p className={`text-lg font-bold ${textPrimary}`}>{sc.health}%</p>
                        </div>
                        <Badge className={getStatusColor(sc.status)}>{sc.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setSelectedSpacecraft(sc.name)} className={buttonPrimaryClasses}>
                        View Telemetry
                      </Button>
                      <Button size="sm" variant="outline" className={buttonOutlineClasses} onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="telemetry" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Live Telemetry - {selectedSpacecraft}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.keys(telemetryData).length > 0 ? (
                    <>
                      <div className="space-y-4">
                        <h3 className={`font-medium flex items-center gap-2 ${textPrimary}`}>
                          <Battery className="h-5 w-5 text-green-400" />
                          Power
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(telemetryData.power).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className={textSecondary}>{key}</span>
                              <span className={textPrimary}>
                                {value}
                                {typeof value === "number" ? "%" : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-medium flex items-center gap-2 ${textPrimary}`}>
                          <Thermometer className="h-5 w-5 text-orange-400" />
                          Thermal
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(telemetryData.thermal).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className={textSecondary}>{key}</span>
                              <span className={textPrimary}>
                                {value}
                                {typeof value === "number" ? "°C" : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-medium flex items-center gap-2 ${textPrimary}`}>
                          <Zap className="h-5 w-5 text-purple-400" />
                          Attitude
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(telemetryData.attitude).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className={textSecondary}>{key}</span>
                              <span className={textPrimary}>
                                {value}
                                {typeof value === "number" ? "°" : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-medium flex items-center gap-2 ${textPrimary}`}>
                          <Radar className="h-5 w-5 text-blue-400" />
                          Comms
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(telemetryData.communication).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className={textSecondary}>{key}</span>
                              <span className={textPrimary}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className={textSecondary}>Loading telemetry...</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-6">
              {anomalies.map((anomaly) => (
                <Card key={anomaly.id} className={cardClasses}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className={textPrimary}>{anomaly.type}</CardTitle>
                        <CardDescription className={textSecondary}>
                          {anomaly.spacecraft} • {anomaly.subsystem}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                        <Badge className={getStatusColor(anomaly.status === "Active" ? "Caution" : "Operational")}>
                          {anomaly.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className={`text-sm font-medium ${textSecondary}`}>AI Recommendation</p>
                      <p className={textPrimary}>{anomaly.recommendation}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${textSecondary}`}>Autonomous Action</p>
                      <p className={textPrimary}>{isAutonomousMode ? anomaly.autoAction : "Manual override active"}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {anomaly.status === "Active" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleAnomalyAction(anomaly.id)}
                        >
                          <Play className="h-4 w-4 mr-2" /> Execute Action
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="predictive" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Predictive Maintenance Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {predictiveAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${itemRowClasses}`}
                    >
                      <div className="flex items-center gap-4">
                        <Brain className="h-6 w-6 text-orange-500" />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{alert.component}</p>
                          <p className={`text-sm ${textSecondary}`}>{alert.prediction}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-sm ${textSecondary}`}>Confidence</p>
                          <p className={`font-semibold ${textPrimary}`}>{alert.confidence}%</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className={buttonOutlineClasses}
                          onClick={() => window.alert(`Maintenance for ${alert.component} has been scheduled.`)}
                        >
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
