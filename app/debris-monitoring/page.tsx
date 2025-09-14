"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { BackButton } from "@/components/back-button" // Added BackButton import
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, Satellite, AlertTriangle, Download, RefreshCw, Calculator } from "lucide-react"

export default function DebrisMonitoringPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedSatellite, setSelectedSatellite] = useState("NOAA-20")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isUpdatingTLEs, setIsUpdatingTLEs] = useState(false)
  const [activeTab, setActiveTab] = useState("conjunctions")
  const [maneuverInputs, setManeuverInputs] = useState({ type: "Radial Boost", deltaV: 1.2 })
  const [maneuverResult, setManeuverResult] = useState(null)
  const [lastTLEUpdate, setLastTLEUpdate] = useState("Sep 14, 2025, 02:20:15")

  const [realtimeData, setRealtimeData] = useState({
    conjunctionEvents: [
      {
        id: "CONJ-2025-001",
        primaryObject: "NOAA-20",
        secondaryObject: "Debris Fragment 47291",
        timeToClosestApproach: "14h 23m",
        missDistance: 127,
        probability: 1.2e-4,
        riskLevel: "Medium",
        recommendedAction: "Monitor",
        deltaV: "0.8 m/s",
      },
      {
        id: "CONJ-2025-002",
        primaryObject: "Sentinel-3B",
        secondaryObject: "Cosmos 1408 Fragment",
        timeToClosestApproach: "2d 8h",
        missDistance: 89,
        probability: 2.7e-4,
        riskLevel: "High",
        recommendedAction: "Avoidance Maneuver",
        deltaV: "1.2 m/s",
      },
      {
        id: "CONJ-2025-003",
        primaryObject: "ISS",
        secondaryObject: "Unknown Object 99847",
        timeToClosestApproach: "6h 45m",
        missDistance: 234,
        probability: 5.1e-5,
        riskLevel: "Low",
        recommendedAction: "Continue Monitoring",
        deltaV: "N/A",
      },
    ],
    trackedObjects: [
      { name: "NOAA-20", type: "Active Satellite", altitude: 824, conjunctions: 3 },
      { name: "Sentinel-3B", type: "Active Satellite", altitude: 814, conjunctions: 5 },
      { name: "ISS", type: "Space Station", altitude: 408, conjunctions: 12 },
    ],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        conjunctionEvents: prev.conjunctionEvents.map((event) => ({
          ...event,
          missDistance: Math.max(50, event.missDistance + (Math.random() - 0.5) * 10),
          probability: Math.max(1e-6, event.probability + (Math.random() - 0.5) * 1e-5),
        })),
        trackedObjects: prev.trackedObjects.map((obj) => ({
          ...obj,
          altitude: obj.altitude + (Math.random() - 0.5) * 2,
          conjunctions: Math.max(0, obj.conjunctions + Math.floor((Math.random() - 0.7) * 2)),
        })),
      }))
    }, 7000) // Update every 7 seconds

    return () => clearInterval(interval)
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  // --- Functional Logic ---
  const handleInputChange = (e) => setManeuverInputs({ ...maneuverInputs, [e.target.name]: e.target.value })

  const handleCalculateManeuver = () => {
    setIsCalculating(true)
    setManeuverResult(null)
    const deltaV = Number.parseFloat(maneuverInputs.deltaV) || 0
    setTimeout(() => {
      setManeuverResult({
        riskReduction: Math.min(99.9, 100 - 15 / (deltaV + 0.1)).toFixed(1),
        durationImpact: (-deltaV * 0.25).toFixed(2),
        fuelCost: (deltaV * 2.0).toFixed(1),
        groundTrackDeviation: (deltaV * 12.5).toFixed(0),
      })
      setIsCalculating(false)
    }, 1500)
  }

  const handleSelectAsset = (name) => {
    setSelectedSatellite(name)
    setActiveTab("maneuvers")
  }

  const handleRefreshTLEs = () => {
    setIsUpdatingTLEs(true)
    setTimeout(() => {
      setLastTLEUpdate(new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "medium" }))
      setIsUpdatingTLEs(false)
    }, 2000)
  }

  const handleExportEvents = () => {
    let csvContent =
      "data:text/csv;charset=utf-8,ID,PrimaryObject,SecondaryObject,RiskLevel,TimeToCA,MissDistance(m),Probability\n"
    realtimeData.conjunctionEvents.forEach((e) => {
      const row = [
        e.id,
        e.primaryObject,
        e.secondaryObject,
        e.riskLevel,
        e.timeToClosestApproach,
        e.missDistance.toFixed(0),
        e.probability,
      ].join(",")
      csvContent += row + "\r\n"
    })
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "conjunction_events.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // --- Styling ---
  const getRiskColor = (risk) => {
    if (risk === "High") return "bg-red-500 text-white"
    if (risk === "Medium") return "bg-yellow-500 text-black"
    return "bg-green-500 text-white"
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
  const inputClasses = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
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
              <BackButton isDarkMode={isDarkMode} />
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
              <Badge variant="outline" className="border-green-400 text-green-400">
                SGP4 Active
              </Badge>
              <Button size="sm" onClick={handleRefreshTLEs} disabled={isUpdatingTLEs} className={buttonPrimaryClasses}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isUpdatingTLEs ? "animate-spin" : ""}`} />
                {isUpdatingTLEs ? "Updating..." : "Update TLEs"}
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
          className={`border-b transition-colors duration-300 ${isDarkMode ? "border-gray-800/50 bg-gradient-to-r from-gray-950 to-gray-950" : "border-gray-200/50 bg-gradient-to-r from-white to-gray-50"}`}
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-light mb-2 ${textPrimary}`}>Space Debris Monitoring</h1>
                <p className={textSecondary}>Collision Risk Assessment & Avoidance</p>
              </div>
              <div className="text-right">
                <div className={`text-xs uppercase tracking-wide ${textSecondary}`}>Last TLE Update</div>
                <div className={`text-lg font-mono ${textPrimary}`}>{lastTLEUpdate}</div>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={tabsListClasses}>
              <TabsTrigger value="conjunctions" className={tabsTriggerClasses}>
                Conjunction Events
              </TabsTrigger>
              <TabsTrigger value="tracking" className={tabsTriggerClasses}>
                Asset Tracking
              </TabsTrigger>
              <TabsTrigger value="maneuvers" className={tabsTriggerClasses}>
                Avoidance Planning
              </TabsTrigger>
            </TabsList>

            <TabsContent value="conjunctions" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className={textPrimary}>High-Risk Conjunction Events</CardTitle>
                    <Button size="sm" variant="outline" className={buttonOutlineClasses} onClick={handleExportEvents}>
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {realtimeData.conjunctionEvents.map((event) => (
                    <Card key={event.id} className={`${itemRowClasses} border`}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className={`text-base ${textPrimary}`}>
                              {event.primaryObject} ↔ {event.secondaryObject}
                            </CardTitle>
                            <CardDescription className={textSecondary}>Event ID: {event.id}</CardDescription>
                          </div>
                          <Badge className={getRiskColor(event.riskLevel)}>{event.riskLevel} Risk</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className={textSecondary}>Time to CA</p>
                            <p className={textPrimary}>{event.timeToClosestApproach}</p>
                          </div>
                          <div>
                            <p className={textSecondary}>Miss Distance</p>
                            <p className={textPrimary}>{Math.round(event.missDistance)} m</p>
                          </div>
                          <div>
                            <p className={textSecondary}>Probability</p>
                            <p className={textPrimary}>{event.probability.toExponential(1)}</p>
                          </div>
                          <div>
                            <p className={textSecondary}>Required ΔV</p>
                            <p className={textPrimary}>{event.deltaV}</p>
                          </div>
                        </div>
                        <Alert className={alertWarningClasses}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Recommended Action</AlertTitle>
                          <AlertDescription>{event.recommendedAction}</AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <Card className={cardClasses}>
                <CardHeader>
                  <CardTitle className={textPrimary}>Tracked High-Value Assets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {realtimeData.trackedObjects.map((obj) => (
                    <div
                      key={obj.name}
                      className={`flex items-center justify-between p-3 rounded-lg border ${itemRowClasses}`}
                    >
                      <div className="flex items-center gap-4">
                        <Satellite className="h-6 w-6 text-orange-500" />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{obj.name}</p>
                          <p className={`text-sm ${textSecondary}`}>{obj.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className={`text-sm ${textSecondary}`}>Altitude</p>
                          <p className={`font-semibold ${textPrimary}`}>{obj.altitude.toFixed(1)} km</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${textSecondary}`}>Conjunctions</p>
                          <p className={`font-semibold ${textPrimary}`}>{obj.conjunctions}</p>
                        </div>
                        <Button size="sm" onClick={() => handleSelectAsset(obj.name)} className={buttonPrimaryClasses}>
                          Plan Maneuver
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maneuvers" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Maneuver Calculator</CardTitle>
                    <CardDescription className={textSecondary}>Selected Asset: {selectedSatellite}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`text-sm ${textSecondary} mb-1 block`}>Maneuver Type</label>
                        <select
                          name="type"
                          value={maneuverInputs.type}
                          onChange={handleInputChange}
                          className={`w-full p-2 rounded border ${inputClasses}`}
                        >
                          <option>Radial Boost</option>
                          <option>In-Track Adjustment</option>
                          <option>Cross-Track Correction</option>
                        </select>
                      </div>
                      <div>
                        <label className={`text-sm ${textSecondary} mb-1 block`}>ΔV Magnitude (m/s)</label>
                        <input
                          name="deltaV"
                          type="number"
                          step="0.1"
                          value={maneuverInputs.deltaV}
                          onChange={handleInputChange}
                          className={`w-full p-2 rounded border ${inputClasses}`}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleCalculateManeuver}
                      disabled={isCalculating}
                      className={`w-full ${buttonPrimaryClasses}`}
                    >
                      {isCalculating ? (
                        <>
                          <Calculator className="h-4 w-4 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate Maneuver
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className={cardClasses}>
                  <CardHeader>
                    <CardTitle className={textPrimary}>Mission Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {maneuverResult ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={textSecondary}>Collision Risk Reduction</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Number.parseFloat(maneuverResult.riskReduction)} className="w-20 h-1.5" />
                            <span className={`${textPrimary} text-sm font-medium`}>
                              {maneuverResult.riskReduction}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={textSecondary}>Mission Duration Impact</span>
                          <span className={textPrimary}>{maneuverResult.durationImpact} days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={textSecondary}>Fuel Consumption</span>
                          <span className={textPrimary}>{maneuverResult.fuelCost} kg</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={textSecondary}>Ground Track Deviation</span>
                          <span className={textPrimary}>±{maneuverResult.groundTrackDeviation} km</span>
                        </div>
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                          onClick={() => window.alert("Maneuver execution command sent.")}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Execute Maneuver
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className={textSecondary}>Calculation results will appear here.</p>
                      </div>
                    )}
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
