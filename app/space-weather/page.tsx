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
import { Zap, Shield, AlertTriangle, Activity, Satellite, Clock, CheckCircle, Radio } from "lucide-react"

export default function SpaceWeatherPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isProtectionActive, setIsProtectionActive] = useState(false)
  const [alertLevel, setAlertLevel] = useState("G2 - Moderate")

  const [solarData, setSolarData] = useState({
    solarFluxIndex: 142.3,
    sunspotNumber: 87,
    solarWindSpeed: 425,
    solarWindDensity: 8.2,
    interplanetaryMagneticField: 6.8,
    kpIndex: 4.2,
    apIndex: 18,
    dstIndex: -45,
  })

  const [sensorNetwork, setSensorNetwork] = useState([
    { name: "SOHO", type: "Solar Observatory", status: "Operational", dataQuality: 98 },
    { name: "ACE", type: "Solar Wind Monitor", status: "Operational", dataQuality: 95 },
    { name: "DSCOVR", type: "Space Weather Monitor", status: "Operational", dataQuality: 97 },
    { name: "Magnetometers", type: "Geomagnetic Network", status: "Operational", dataQuality: 94 },
  ])

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
    const interval = setInterval(() => {
      setSolarData((prev) => ({
        ...prev,
        solarFluxIndex: Math.max(130, Math.min(160, prev.solarFluxIndex + (Math.random() - 0.5) * 5)),
        sunspotNumber: Math.max(70, Math.min(110, prev.sunspotNumber + (Math.random() - 0.5) * 8)),
        solarWindSpeed: Math.max(350, Math.min(500, prev.solarWindSpeed + (Math.random() - 0.5) * 20)),
        solarWindDensity: Math.max(5, Math.min(12, prev.solarWindDensity + (Math.random() - 0.5) * 1)),
        interplanetaryMagneticField: Math.max(
          4,
          Math.min(10, prev.interplanetaryMagneticField + (Math.random() - 0.5) * 0.5),
        ),
        kpIndex: Math.max(2, Math.min(7, prev.kpIndex + (Math.random() - 0.5) * 0.3)),
        apIndex: Math.max(10, Math.min(30, prev.apIndex + (Math.random() - 0.5) * 3)),
        dstIndex: Math.max(-80, Math.min(-20, prev.dstIndex + (Math.random() - 0.5) * 8)),
      }))

      setSensorNetwork((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          dataQuality: Math.max(90, Math.min(99, sensor.dataQuality + (Math.random() - 0.5) * 2)),
        })),
      )
    }, 9000) // Update every 9 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  // --- Functional Logic ---
  const handleProtectionToggle = () => {
    const newStatus = !isProtectionActive
    setIsProtectionActive(newStatus)

    // Simulate alert level change based on protection status
    if (newStatus) {
      setAlertLevel("G1 - Minor") // Protection lowers the effective alert
    } else {
      setAlertLevel("G2 - Moderate") // Reverts to original alert level
    }
  }

  // --- Data ---
  const currentEvents = [
    {
      id: "SW-2025-001",
      type: "Solar Flare",
      class: "M5.2",
      region: "AR3562",
      startTime: "Sep 13, 12:45",
      peakTime: "Sep 13, 13:15",
      status: "Ongoing",
      impact: "Radio blackouts",
    },
    {
      id: "SW-2025-002",
      type: "CME",
      speed: "650 km/s",
      direction: "Earth-directed",
      launchTime: "Sep 13, 13:20",
      arrivalTime: "Sep 15, 08:30",
      status: "En Route",
      impact: "Geomagnetic storm",
    },
  ]

  const forecasts = [
    {
      date: "Sep 15, 2025",
      geomagneticActivity: "G1 - Minor",
      solarRadiation: "S1 - Minor",
      radioBlackout: "R2 - Moderate",
      confidence: 87,
    },
    {
      date: "Sep 16, 2025",
      geomagneticActivity: "G3 - Strong",
      solarRadiation: "S2 - Moderate",
      radioBlackout: "R1 - Minor",
      confidence: 92,
    },
    {
      date: "Sep 17, 2025",
      geomagneticActivity: "G2 - Moderate",
      solarRadiation: "S1 - Minor",
      radioBlackout: "R1 - Minor",
      confidence: 78,
    },
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

  const cardClasses = isDarkMode ? "bg-gray-950/50 border-gray-800/50" : "bg-white border-gray-200"
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900"
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-600"
  const buttonPrimaryClasses = "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
  const tabsListClasses = isDarkMode ? "bg-gray-900" : "bg-gray-200"
  const tabsTriggerClasses = isDarkMode
    ? "data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-400"
    : "data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-600"
  const itemRowClasses = isDarkMode ? "bg-gray-900/60 border-gray-800/70" : "bg-gray-50 border-gray-200"
  const alertWarningClasses = isDarkMode
    ? "border-yellow-500/50 bg-yellow-900/50 text-yellow-300"
    : "border-yellow-300 bg-yellow-50 text-yellow-800"
  const alertSuccessClasses = isDarkMode
    ? "border-green-500/50 bg-green-900/50 text-green-300"
    : "border-green-300 bg-green-50 text-green-800"
  const alertInfoClasses = isDarkMode
    ? "border-blue-500/50 bg-blue-900/50 text-blue-300"
    : "border-blue-300 bg-blue-50 text-blue-800"

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
                  src="/public/images/space-logo-large.png"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Solar Indices</CardTitle>
                    <CardDescription className={textSecondary}>Real-time solar activity measurements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Solar Flux (10.7 cm)</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.solarFluxIndex}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Sunspot Number</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.sunspotNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Solar Wind Speed</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.solarWindSpeed} km/s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Solar Wind Density</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.solarWindDensity} p/cm³</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Geomagnetic Indices</CardTitle>
                    <CardDescription className={textSecondary}>Earth's magnetic field disturbance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Kp Index</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(solarData.kpIndex / 9) * 100} className="w-20" />
                        <span className={`${textPrimary} font-medium`}>{solarData.kpIndex}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Ap Index</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.apIndex} nT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Dst Index</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.dstIndex} nT</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>IMF Magnitude</span>
                      <span className={`${textPrimary} font-medium`}>{solarData.interplanetaryMagneticField} nT</span>
                    </div>
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
                          <CardTitle className={textPrimary}>
                            {event.type} - {event.id}
                          </CardTitle>
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className={`text-sm ${textSecondary}`}>
                          {event.type === "Solar Flare" ? "Start Time" : "Launch Time"}
                        </p>
                        <p className={`${textPrimary} font-medium`}>
                          {event.type === "Solar Flare" ? event.startTime : event.launchTime}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary}`}>
                          {event.type === "Solar Flare" ? "Peak Time" : "Est. Arrival"}
                        </p>
                        <p className={`${textPrimary} font-medium`}>
                          {event.type === "Solar Flare" ? event.peakTime : event.arrivalTime}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary}`}>
                          {event.type === "Solar Flare" ? "Region" : "Direction"}
                        </p>
                        <p className={`${textPrimary} font-medium`}>
                          {event.type === "Solar Flare" ? event.region : event.direction}
                        </p>
                      </div>
                    </div>
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
                          <Badge className={getAlertColor(forecast.geomagneticActivity)}>
                            {forecast.geomagneticActivity.split(" ")[0]}
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
                  <CardTitle className={textPrimary}>Protected Space Assets</CardTitle>
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
                            <p className={`text-sm ${textSecondary}`}>Protection Action</p>
                            <p className={`text-sm ${textPrimary}`}>{isProtectionActive ? asset.action : "Standby"}</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${textSecondary}`}>Risk Reduction</p>
                            <div className="flex items-center gap-2">
                              <Progress value={isProtectionActive ? asset.riskReduction : 0} className="w-16" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Automatic Responses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Alert className={alertSuccessClasses}>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>ISS Crew Protection</AlertTitle>
                      <AlertDescription>Crew moved to shielded module.</AlertDescription>
                    </Alert>
                    <Alert className={alertInfoClasses}>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>Satellite Safe Mode</AlertTitle>
                      <AlertDescription>12 satellites automatically configured.</AlertDescription>
                    </Alert>
                    <Alert className={alertWarningClasses}>
                      <Radio className="h-4 w-4" />
                      <AlertTitle>Communication Adjustment</AlertTitle>
                      <AlertDescription>Enhanced error correction for GPS.</AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Protection Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Assets Protected</span>
                      <span className={`${textPrimary} font-bold`}>{isProtectionActive ? "47/52" : "0/52"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Average Risk Reduction</span>
                      <div className="flex items-center gap-2">
                        <Progress value={isProtectionActive ? 80 : 0} className="w-20" />
                        <span className={textPrimary}>{isProtectionActive ? "80%" : "0%"}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={textSecondary}>Response Time</span>
                      <span className={textPrimary}>{isProtectionActive ? "< 5 minutes" : "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
