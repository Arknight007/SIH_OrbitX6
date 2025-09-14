"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { FlipCard } from "@/components/flip-card"
import { BackButton } from "@/components/back-button" // Added BackButton import
import { Badge } from "@/components/ui/badge"
import { Satellite, Bell, User, Rocket, Shield, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function TeamPage() {
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

  const crewMembers = [
    {
      id: "prasanth-nair",
      title: "Group Captain Prasanth Balakrishnan Nair",
      description: "Lead astronaut for Gaganyaan mission with extensive flight experience.",
      icon: Rocket,
      status: "ACTIVE",
      features: ["Test Pilot", "IAF Background", "Mission Leader"],
      href: "/crew/prasanth-nair",
    },
    {
      id: "ajit-krishnan",
      title: "Group Captain Ajit Krishnan",
      description: "Experienced pilot and backup commander for the mission.",
      icon: User,
      status: "ACTIVE",
      features: ["Test Pilot", "IAF Background", "Backup Commander"],
      href: "/crew/ajit-krishnan",
    },
    {
      id: "shubhanshu-shukla",
      title: "Wing Commander Shubhanshu Shukla",
      description: "Mission specialist responsible for scientific experiments.",
      icon: Activity,
      status: "ACTIVE",
      features: ["Mission Specialist", "Scientific Research", "Experiment Coordinator"],
      href: "/crew/shubhanshu-shukla",
    },
  ]

  const groundTeam = [
    {
      id: "mission-control",
      title: "Mission Control Team",
      description: "Ground control team monitoring all mission parameters.",
      icon: Shield,
      status: "ACTIVE",
      features: ["ISRO Bangalore", "Real-time Monitoring", "Mission Safety"],
      href: "/ground-team/mission-control",
    },
    {
      id: "launch-operations",
      title: "Launch Operations",
      description: "SDSC SHAR launch operations and vehicle management team.",
      icon: Rocket,
      status: "ACTIVE",
      features: ["SDSC SHAR", "GSLV Mk III", "Launch Operations"],
      href: "/ground-team/launch-ops",
    },
    {
      id: "medical-team",
      title: "Medical Team",
      description: "Medical monitoring and crew health management team.",
      icon: Activity,
      status: "ACTIVE",
      features: ["Crew Health", "Medical Support", "Emergency Response"],
      href: "/ground-team/medical",
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
                <BackButton isDarkMode={isDarkMode} />
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
      </motion.nav>

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
                  Mission Crew & Team
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Gaganyaan astronauts and ground support teams
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

        <div className="p-6 space-y-8">
          <div>
            <h2 className={`text-xl font-light mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Astronaut Crew</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {crewMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <FlipCard
                    id={member.id}
                    title={member.title}
                    description={member.description}
                    icon={member.icon}
                    status={member.status}
                    features={member.features}
                    href={member.href}
                    isDarkMode={isDarkMode}
                    showOpenButton={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-xl font-light mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Ground Support Team
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {groundTeam.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  <FlipCard
                    id={team.id}
                    title={team.title}
                    description={team.description}
                    icon={team.icon}
                    status={team.status}
                    features={team.features}
                    href={team.href}
                    isDarkMode={isDarkMode}
                    showOpenButton={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
