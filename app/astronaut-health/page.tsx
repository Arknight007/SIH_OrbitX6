"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Bell,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  Zap,
  Brain,
  Shield,
  AlertTriangle,
  Video,
  Stethoscope,
  Download,
} from "lucide-react"

export default function AstronautHealthPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedCrew, setSelectedCrew] = useState("Commander Sarah Chen")
  const [isTelemedicineActive, setIsTelemedicineActive] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [activeTab, setActiveTab] = useState("crew")
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)

  const [realtimeData, setRealtimeData] = useState({
    crewMembers: [
      {
        name: "Commander Sarah Chen",
        role: "Mission Commander",
        status: "Nominal",
        riskScore: 15,
        vitals: {
          heartRate: 72,
          bloodPressure: "118/76",
          temperature: 36.8,
          oxygenSat: 98,
          radiationDose: 0.45,
          respirationRate: 16,
        },
      },
      {
        name: "Dr. Marcus Rodriguez",
        role: "Flight Engineer",
        status: "Caution",
        riskScore: 35,
        vitals: {
          heartRate: 85,
          bloodPressure: "125/82",
          temperature: 37.2,
          oxygenSat: 97,
          radiationDose: 0.52,
          respirationRate: 18,
        },
      },
      {
        name: "Specialist Yuki Tanaka",
        role: "Mission Specialist",
        status: "Nominal",
        riskScore: 12,
        vitals: {
          heartRate: 68,
          bloodPressure: "115/72",
          temperature: 36.6,
          oxygenSat: 99,
          radiationDose: 0.38,
          respirationRate: 15,
        },
      },
    ],
    lifeSupport: {
      oxygenLevel: 21.2,
      co2Level: 0.3,
      pressure: 101.3,
      humidity: 45,
      temperature: 22.5,
      airQuality: "Excellent",
      waterReserves: 85,
      waterRecyclingRate: 93,
      powerBusA_Voltage: 120.5,
      powerBusB_Voltage: 120.3,
    },
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        crewMembers: prev.crewMembers.map((crew) => ({
          ...crew,
          vitals: {
            ...crew.vitals,
            heartRate: Math.max(60, Math.min(100, crew.vitals.heartRate + (Math.random() - 0.5) * 4)),
            temperature: Math.max(36.0, Math.min(38.0, crew.vitals.temperature + (Math.random() - 0.5) * 0.2)),
            oxygenSat: Math.max(95, Math.min(100, crew.vitals.oxygenSat + (Math.random() - 0.5) * 2)),
            radiationDose: Math.max(0.1, crew.vitals.radiationDose + (Math.random() - 0.5) * 0.02),
            respirationRate: Math.max(12, Math.min(25, crew.vitals.respirationRate + (Math.random() - 0.5) * 2)),
          },
        })),
        lifeSupport: {
          ...prev.lifeSupport,
          oxygenLevel: Math.max(20.5, Math.min(21.5, prev.lifeSupport.oxygenLevel + (Math.random() - 0.5) * 0.1)),
          co2Level: Math.max(0.1, Math.min(0.5, prev.lifeSupport.co2Level + (Math.random() - 0.5) * 0.05)),
          pressure: Math.max(100.0, Math.min(102.0, prev.lifeSupport.pressure + (Math.random() - 0.5) * 0.2)),
          humidity: Math.max(40, Math.min(50, prev.lifeSupport.humidity + (Math.random() - 0.5) * 2)),
          temperature: Math.max(21.0, Math.min(24.0, prev.lifeSupport.temperature + (Math.random() - 0.5) * 0.3)),
          waterReserves: Math.max(80, Math.min(90, prev.lifeSupport.waterReserves + (Math.random() - 0.5) * 1)),
          waterRecyclingRate: Math.max(
            90,
            Math.min(95, prev.lifeSupport.waterRecyclingRate + (Math.random() - 0.5) * 0.5),
          ),
          powerBusA_Voltage: Math.max(
            119.0,
            Math.min(122.0, prev.lifeSupport.powerBusA_Voltage + (Math.random() - 0.5) * 0.3),
          ),
          powerBusB_Voltage: Math.max(
            119.0,
            Math.min(122.0, prev.lifeSupport.powerBusB_Voltage + (Math.random() - 0.5) * 0.3),
          ),
        },
      }))
    }, 6000) // Update every 6 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  // --- Data ---
  const healthAlerts = [
    {
      id: "HEALTH-001",
      crew: "Dr. Marcus Rodriguez",
      type: "Elevated Temperature",
      severity: "Medium",
      description: "Core temperature elevated to 37.2°C for 2+ hours.",
      recommendation: "Increase fluid intake, monitor for 4 hours.",
    },
    {
      id: "HEALTH-002",
      crew: "Commander Sarah Chen",
      type: "Radiation Exposure",
      severity: "Low",
      description: "Daily radiation dose approaching 80% of limit.",
      recommendation: "Limit EVA activities, seek shielded areas.",
    },
  ]

  const selectedCrewData =
    realtimeData.crewMembers.find((crew) => crew.name === selectedCrew) || realtimeData.crewMembers[0]

  // --- Functional Logic ---
  const handleViewDetails = (crewName) => {
    setSelectedCrew(crewName)
    setActiveTab("vitals")
  }

  const handleDownloadCrewData = () => {
    let csvContent =
      "data:text/csv;charset=utf-8,Name,Role,Status,Risk Score,Heart Rate (bpm),Blood Pressure,Temperature (°C),O2 Saturation (%),Radiation (mSv)\n"
    realtimeData.crewMembers.forEach((crew) => {
      const row = [
        crew.name,
        crew.role,
        crew.status,
        crew.riskScore,
        crew.vitals.heartRate,
        `"${crew.vitals.bloodPressure}"`,
        crew.vitals.temperature,
        crew.vitals.oxygenSat,
        crew.vitals.radiationDose,
      ].join(",")
      csvContent += row + "\r\n"
    })
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "crew_health_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStartSession = async () => {
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(cameraStream)
      setIsTelemedicineActive(true)
    } catch (err) {
      console.error("Error accessing camera: ", err)
      alert("Could not access the camera. Please check permissions.")
    }
  }

  const handleEndSession = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    setStream(null)
    setIsTelemedicineActive(false)
  }

  // --- Styling ---
  const getStatusColor = (status) => {
    if (status === "Nominal") return "bg-green-500 text-white"
    if (status === "Caution") return "bg-yellow-500 text-black"
    return "bg-red-500 text-white"
  }

  const getRiskColor = (score) => {
    if (score < 20) return isDarkMode ? "text-green-400" : "text-green-600"
    if (score < 40) return isDarkMode ? "text-yellow-400" : "text-yellow-600"
    return isDarkMode ? "text-red-400" : "text-red-600"
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
              <Badge className="bg-orange-600 text-white border border-orange-500">MISSION READY</Badge>
              <Button size="sm" variant="ghost" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
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
                <h1 className={`text-3xl font-light mb-2 ${textPrimary}`}>Astronaut Health Monitoring</h1>
                <p className={textSecondary}>Biomedical & Life Support Systems</p>
              </div>
              <div className="text-right">
                <div className={`text-xs uppercase tracking-wide ${textSecondary}`}>Current Time (IST)</div>
                <div className={`text-lg font-mono ${textPrimary}`}>{currentTime || "Loading..."}</div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={tabsListClasses}>
              <TabsTrigger value="crew" className={tabsTriggerClasses}>
                Crew Health
              </TabsTrigger>
              <TabsTrigger value="vitals" className={tabsTriggerClasses}>
                Vital Signs
              </TabsTrigger>
              <TabsTrigger value="life-support" className={tabsTriggerClasses}>
                Life Support
              </TabsTrigger>
              <TabsTrigger value="telemedicine" className={tabsTriggerClasses}>
                Telemedicine
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crew" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className={textPrimary}>Crew Health Overview</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className={buttonOutlineClasses}
                      onClick={handleDownloadCrewData}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {realtimeData.crewMembers.map((crew) => (
                    <Card key={crew.name} className={`${itemRowClasses} border`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Activity className="h-6 w-6 text-orange-500" />
                            <div>
                              <CardTitle className={`text-base ${textPrimary}`}>{crew.name}</CardTitle>
                              <CardDescription className={textSecondary}>{crew.role}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className={`text-sm ${textSecondary}`}>Risk Score</p>
                              <p className={`text-lg font-bold ${getRiskColor(crew.riskScore)}`}>{crew.riskScore}</p>
                            </div>
                            <Badge className={getStatusColor(crew.status)}>{crew.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleViewDetails(crew.name)}
                            className={buttonPrimaryClasses}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={buttonOutlineClasses}
                            onClick={() => window.alert(`Fetching medical history for ${crew.name}...`)}
                          >
                            Medical History
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Active Health Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthAlerts.map((alert) => (
                    <Alert key={alert.id} className={alertWarningClasses}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>
                        {alert.type} - {alert.crew}
                      </AlertTitle>
                      <AlertDescription>
                        {alert.description}
                        <br />
                        <span className="font-semibold">Recommendation:</span> {alert.recommendation}
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Real-time Vitals - {selectedCrewData.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Heart Rate</span>
                      <Heart className="h-5 w-5 text-red-400" />
                    </div>
                    <p className={`text-3xl font-bold ${textPrimary}`}>
                      {Math.round(selectedCrewData.vitals.heartRate)} <span className="text-lg font-normal">bpm</span>
                    </p>
                    <Progress value={(selectedCrewData.vitals.heartRate - 50) * 2} className="h-1 mt-2" />
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Blood Pressure</span>
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className={`text-3xl font-bold ${textPrimary}`}>{selectedCrewData.vitals.bloodPressure}</p>
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Core Temp</span>
                      <Thermometer className="h-5 w-5 text-orange-400" />
                    </div>
                    <p className={`text-3xl font-bold ${textPrimary}`}>
                      {selectedCrewData.vitals.temperature.toFixed(1)} <span className="text-lg font-normal">°C</span>
                    </p>
                    <Progress value={(selectedCrewData.vitals.temperature - 36) * 50} className="h-1 mt-2" />
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">O₂ Saturation</span>
                      <Droplets className="h-5 w-5 text-cyan-400" />
                    </div>
                    <p className={`text-3xl font-bold ${textPrimary}`}>
                      {Math.round(selectedCrewData.vitals.oxygenSat)} <span className="text-lg font-normal">%</span>
                    </p>
                    <Progress value={selectedCrewData.vitals.oxygenSat} className="h-1 mt-2" />
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Radiation Dose</span>
                      <Shield className="h-5 w-5 text-purple-400" />
                    </div>
                    <p className={`text-3xl font-bold ${textPrimary}`}>
                      {selectedCrewData.vitals.radiationDose.toFixed(2)}{" "}
                      <span className="text-lg font-normal">mSv</span>
                    </p>
                    <Progress value={(selectedCrewData.vitals.radiationDose / 0.6) * 100} className="h-1 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="life-support">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Life Support Systems</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <h3 className={`font-semibold mb-2 ${textPrimary}`}>Atmospheric Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Oxygen Level</span>
                        <span className={textPrimary}>{realtimeData.lifeSupport.oxygenLevel.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>CO₂ Level</span>
                        <span className={textPrimary}>{realtimeData.lifeSupport.co2Level.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Pressure</span>
                        <span className={textPrimary}>{realtimeData.lifeSupport.pressure.toFixed(1)} kPa</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Humidity</span>
                        <span className={textPrimary}>{Math.round(realtimeData.lifeSupport.humidity)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Temperature</span>
                        <span className={textPrimary}>{realtimeData.lifeSupport.temperature.toFixed(1)}°C</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <h3 className={`font-semibold mb-2 ${textPrimary}`}>Resource Management</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Water Reserves</span>
                        <span className={textPrimary}>{Math.round(realtimeData.lifeSupport.waterReserves)}%</span>
                      </div>
                      <Progress value={realtimeData.lifeSupport.waterReserves} className="h-1" />
                      <div className="flex justify-between text-sm pt-2">
                        <span className={textSecondary}>Water Recycling Rate</span>
                        <span className={textPrimary}>{realtimeData.lifeSupport.waterRecyclingRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={realtimeData.lifeSupport.waterRecyclingRate} className="h-1" />
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border ${itemRowClasses}`}>
                    <h3 className={`font-semibold mb-2 ${textPrimary}`}>System Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Air Quality</span>
                        <Badge className={getStatusColor("Nominal")}>{realtimeData.lifeSupport.airQuality}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>O₂ Generator</span>
                        <Badge className={getStatusColor("Nominal")}>Operational</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>CO₂ Scrubber</span>
                        <Badge className={getStatusColor("Nominal")}>Operational</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Power Bus A</span>
                        <Badge className={getStatusColor("Nominal")}>
                          {realtimeData.lifeSupport.powerBusA_Voltage.toFixed(1)}V
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={textSecondary}>Power Bus B</span>
                        <Badge className={getStatusColor("Nominal")}>
                          {realtimeData.lifeSupport.powerBusB_Voltage.toFixed(1)}V
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="telemedicine">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Telemedicine Console</CardTitle>
                  <CardDescription className={textSecondary}>Remote medical consultation system</CardDescription>
                </CardHeader>
                <CardContent>
                  {isTelemedicineActive ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div
                          className={`w-full aspect-video rounded-lg overflow-hidden border ${itemRowClasses} flex items-center justify-center`}
                        >
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          ></video>
                        </div>
                        <Alert className={alertInfoClasses}>
                          <Video className="h-4 w-4" />
                          <AlertTitle>Session Active</AlertTitle>
                          <AlertDescription>Connected to Flight Surgeon Dr. Emily Watson.</AlertDescription>
                        </Alert>
                        <Button
                          size="sm"
                          onClick={handleEndSession}
                          className="bg-red-600 hover:bg-red-700 text-white w-full"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          End Session
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <h3 className={`font-semibold ${textPrimary}`}>Available Procedures</h3>
                        <Button
                          variant="outline"
                          className={`${buttonOutlineClasses} w-full justify-start`}
                          onClick={() => window.alert("Starting guided ultrasound scan.")}
                        >
                          <Stethoscope className="h-4 w-4 mr-2" />
                          Guided Ultrasound
                        </Button>
                        <Button
                          variant="outline"
                          className={`${buttonOutlineClasses} w-full justify-start`}
                          onClick={() => window.alert("Starting cardiac assessment.")}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Cardiac Assessment
                        </Button>
                        <Button
                          variant="outline"
                          className={`${buttonOutlineClasses} w-full justify-start`}
                          onClick={() => window.alert("Starting neurological check.")}
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          Neurological Check
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Video className={`h-12 w-12 mx-auto mb-4 ${textSecondary}`} />
                      <h3 className={`text-xl font-semibold ${textPrimary}`}>Telemedicine Ready</h3>
                      <p className={`mb-4 ${textSecondary}`}>Connect with ground-based specialists.</p>
                      <Button onClick={handleStartSession} className={buttonPrimaryClasses}>
                        <Video className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
