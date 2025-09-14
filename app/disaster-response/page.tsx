"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, Shield, AlertTriangle, Activity, Satellite, Clock } from "lucide-react"

export default function SpaceWeatherPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isProtectionActive, setIsProtectionActive] = useState(false)
  const [alertLevel, setAlertLevel] = useState("G2 - Moderate")
  const [lastUpdate, setLastUpdate] = useState("Sep 14, 2025, 03:05:00")

  const [protectedAssets, setProtectedAssets] = useState([
    {
      name: "ISS",
      type: "Space Station",
      standby: "Monitoring",
      active: "Protected",
      action: "Crew in shielded area",
      riskReduction: 85,
    },
    {
      name: "Hubble Telescope",
      type: "Observatory",
      standby: "Operational",
      active: "Safe Mode",
      action: "Instruments powered down",
      riskReduction: 92,
    },
    {
      name: "GPS Constellation",
      type: "Navigation",
      standby: "Operational",
      active: "Monitoring",
      action: "Enhanced error correction",
      riskReduction: 65,
    },
    {
      name: "Starlink Fleet",
      type: "Communication",
      standby: "Operational",
      active: "Degraded Mode",
      action: "Reduced power operations",
      riskReduction: 78,
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium" }))
    }, 5000) // Update every 5 seconds to simulate live data
    return () => clearInterval(timer)
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  // --- Functional Logic ---
  const handleProtectionToggle = () => {
    const newStatus = !isProtectionActive
    setIsProtectionActive(newStatus)

    if (newStatus) {
      setAlertLevel("G1 - Minor")
      window.alert("Asset protection protocols activated. All systems transitioning to safe or protected states.")
    } else {
      setAlertLevel("G2 - Moderate")
      window.alert("Asset protection protocols deactivated. Systems returning to normal operations.")
    }
  }

  // --- Data ---
  const solarData = { solarFluxIndex: 142.3, sunspotNumber: 87, solarWindSpeed: 425, kpIndex: 4.2 }
  const currentEvents = [
    { id: "SW-2025-001", type: "Solar Flare", class: "M5.2", status: "Ongoing", impact: "Radio blackouts" },
    { id: "SW-2025-002", type: "CME", speed: "650 km/s", status: "En Route", impact: "Geomagnetic storm expected" },
  ]
  const forecasts = [
    { date: "Sep 15", geomagnetic: "G1", solarRadiation: "S1", radioBlackout: "R2", confidence: 87 },
    { date: "Sep 16", geomagnetic: "G3", solarRadiation: "S2", radioBlackout: "R1", confidence: 92 },
    { date: "Sep 17", geomagnetic: "G2", solarRadiation: "S1", radioBlackout: "R1", confidence: 78 },
  ]
  const sensorNetwork = [
    { name: "SOHO", type: "Solar Observatory", status: "Operational", dataQuality: 98 },
    { name: "ACE", type: "Solar Wind Monitor", status: "Operational", dataQuality: 95 },
    { name: "DSCOVR", type: "Space Weather Monitor", status: "Operational", dataQuality: 97 },
    { name: "Magnetometers", type: "Geomagnetic Network", status: "Operational", dataQuality: 94 },
  ]

  // --- Styling ---
  const getAlertColor = (level) => {
    if (level.includes("G3") || level.includes("S3") || level.includes("R3")) return "bg-red-500 text-white"
    if (level.includes("G2") || level.includes("S2") || level.includes("R2")) return "bg-yellow-500 text-black"
    if (level.includes("G1") || level.includes("S1") || level.includes("R1")) return "bg-blue-500 text-white"
    return "bg-green-500 text-white"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Protected":
      case "Operational":
        return "bg-green-500 text-white"
      case "Safe Mode":
      case "Monitoring":
        return "bg-yellow-500 text-black"
      case "Degraded Mode":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRiskColor = (riskLevel) => {
    if (riskLevel >= 30) return "text-red-500"
    if (riskLevel >= 20) return "text-yellow-500"
    if (riskLevel >= 10) return "text-orange-500"
    return "text-green-500"
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
  const alertWarningClasses = isDarkMode
    ? "border-yellow-500/50 bg-yellow-900/50 text-yellow-300"
    : "border-yellow-300 bg-yellow-50 text-yellow-800"

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
              <Badge className={getAlertColor(alertLevel)}>Alert: {alertLevel}</Badge>
              <Button
                size="sm"
                onClick={handleProtectionToggle}
                className={`${isProtectionActive ? "bg-green-600" : buttonPrimaryClasses} text-white`}
              >
                <Shield className="h-4 w-4 mr-2" />
                {isProtectionActive ? "Protection Active" : "Activate Protection"}
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
                <h1 className={`text-3xl font-light mb-2 ${textPrimary}`}>Space Weather Forecasting</h1>
                <p className={textSecondary}>Solar Storm Prediction & Protection</p>
                <div className="mt-4">
                  <a
                    href="https://winning-team-yu9z.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Earth Watch Application
                  </a>
                  <p className={`text-xs mt-2 ${textSecondary}`}>
                    * Application is currently available for desktop only
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs uppercase tracking-wide ${textSecondary}`}>Last Data Update</div>
                <div className={`text-lg font-mono ${textPrimary}`}>{lastUpdate}</div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="p-6">
          <Tabs defaultValue="current" className="space-y-6">
            <TabsList className={tabsListClasses}>
              <TabsTrigger value="current" className={tabsTriggerClasses}>
                Current Conditions
              </TabsTrigger>
              <TabsTrigger value="events" className={tabsTriggerClasses}>
                Active Events
              </TabsTrigger>
              <TabsTrigger value="forecast" className={tabsTriggerClasses}>
                Forecasts
              </TabsTrigger>
              <TabsTrigger value="protection" className={tabsTriggerClasses}>
                Asset Protection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={`text-base ${textPrimary}`}>Solar Flux</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold ${textPrimary}`}>
                      {solarData.solarFluxIndex} <span className="text-sm font-normal text-gray-400">sfu</span>
                    </p>
                  </CardContent>
                </Card>
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={`text-base ${textPrimary}`}>Sunspot Number</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{solarData.sunspotNumber}</p>
                  </CardContent>
                </Card>
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={`text-base ${textPrimary}`}>Solar Wind Speed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold ${textPrimary}`}>
                      {solarData.solarWindSpeed} <span className="text-sm font-normal text-gray-400">km/s</span>
                    </p>
                  </CardContent>
                </Card>
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={`text-base ${textPrimary}`}>Kp Index</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-2xl font-bold ${getRiskColor(solarData.kpIndex > 4 ? 40 : 10)}`}>
                      {solarData.kpIndex}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Sensor Network Status</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sensorNetwork.map((sensor) => (
                    <div key={sensor.name} className={`p-4 rounded-lg border ${itemRowClasses}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className={`font-medium ${textPrimary}`}>{sensor.name}</p>
                        <Badge className={getStatusColor(sensor.status)}>{sensor.status}</Badge>
                      </div>
                      <p className={`text-sm ${textSecondary} mb-2`}>{sensor.type}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${textSecondary}`}>Data Quality</span>
                        <span className={`text-sm font-semibold ${textPrimary}`}>{sensor.dataQuality}%</span>
                      </div>
                      <Progress value={sensor.dataQuality} className="h-1 mt-1" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              {currentEvents.map((event) => (
                <Card key={event.id} className={cardClasses}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {event.type === "Solar Flare" ? (
                          <Zap className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <Activity className="h-6 w-6 text-orange-400" />
                        )}
                        <div>
                          <CardTitle className={textPrimary}>{event.type}</CardTitle>
                          <CardDescription className={textSecondary}>
                            {event.type === "Solar Flare" ? `Class ${event.class}` : `Speed: ${event.speed}`}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={event.status === "Ongoing" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"}
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Alert className={alertWarningClasses}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Potential Impact</AlertTitle>
                      <AlertDescription>{event.impact}</AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>3-Day Space Weather Forecast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {forecasts.map((forecast) => (
                    <div
                      key={forecast.date}
                      className={`flex items-center justify-between p-3 rounded-lg border ${itemRowClasses}`}
                    >
                      <div className="flex items-center gap-4">
                        <Clock className="h-6 w-6 text-orange-500" />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{forecast.date}</p>
                          <p className={`text-sm ${textSecondary}`}>Confidence: {forecast.confidence}%</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className={`text-sm ${textSecondary}`}>Geomagnetic</p>
                          <Badge className={getAlertColor(forecast.geomagnetic)}>
                            {forecast.geomagnetic.split(" ")[0]}
                          </Badge>
                        </div>
                        <div>
                          <p className={`text-sm ${textSecondary}`}>Solar Radiation</p>
                          <Badge className={getAlertColor(forecast.solarRadiation)}>
                            {forecast.solarRadiation.split(" ")[0]}
                          </Badge>
                        </div>
                        <div>
                          <p className={`text-sm ${textSecondary}`}>Radio Blackout</p>
                          <Badge className={getAlertColor(forecast.radioBlackout)}>
                            {forecast.radioBlackout.split(" ")[0]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="protection" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Asset Protection Status</CardTitle>
                  <CardDescription className={textSecondary}>
                    Automated protective responses for space weather events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {protectedAssets.map((asset) => {
                    const currentStatus = isProtectionActive ? asset.active : asset.standby
                    return (
                      <div
                        key={asset.name}
                        className={`flex items-center justify-between p-3 rounded-lg border ${itemRowClasses}`}
                      >
                        <div className="flex items-center gap-4">
                          <Satellite className="h-6 w-6 text-orange-500" />
                          <div>
                            <p className={`font-medium ${textPrimary}`}>{asset.name}</p>
                            <p className={`text-sm ${textSecondary}`}>{asset.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center w-48">
                            <p className={`text-sm ${textSecondary}`}>Action</p>
                            <p className={`text-sm ${textPrimary}`}>{isProtectionActive ? asset.action : "Standby"}</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${textSecondary}`}>Risk Reduction</p>
                            <div className="flex items-center gap-2">
                              <Progress value={isProtectionActive ? asset.riskReduction : 0} className="w-16 h-1.5" />
                              <span className={`${textPrimary} text-sm w-8`}>
                                {isProtectionActive ? `${asset.riskReduction}%` : "0%"}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(currentStatus)}>{currentStatus}</Badge>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
