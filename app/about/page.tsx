"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { FlipCard } from "@/components/flip-card"
import { Badge } from "@/components/ui/badge"
import { Bell, Rocket, Users, Target } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

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

  const missionDetails = [
    {
      id: "orbitx6-mission",
      title: "OrbitX6 Mission",
      description: "Advanced space operations platform for comprehensive mission control and monitoring.",
      icon: Rocket,
      status: "ACTIVE",
      features: ["Real-time monitoring", "Advanced analytics", "Mission control systems"],
      href: "/mission-details",
    },
    {
      id: "mission-objectives",
      title: "Mission Objectives",
      description: "Provide cutting-edge space operations technology and mission support capabilities.",
      icon: Target,
      status: "PLANNING",
      features: ["Space operations", "Mission support", "Technology advancement"],
      href: "/objectives",
    },
    {
      id: "collaborators",
      title: "Collaborators",
      description: "Key organizations and partners supporting OrbitX6 operations.",
      icon: Users,
      status: "ACTIVE",
      features: ["Space agencies", "Technology partners", "Research institutions"],
      href: "/collaborators",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <CollapsibleSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-b backdrop-blur-sm transition-colors duration-300 ${
          isDarkMode ? "border-gray-800/50 bg-gray-950/50" : "border-gray-200/50 bg-white/50"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 ml-16">
              <div className="flex items-center gap-3">
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
      </motion.nav>

      {/* Main Content */}
      <main className="pl-0">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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
                  About OrbitX6 Mission
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Advanced space operations platform and mission objectives
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
        </motion.header>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {missionDetails.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.1,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                <FlipCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  status={item.status}
                  features={item.features}
                  href={item.href}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
