"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { FlipCard } from "@/components/flip-card"
import { Satellite, Shield, Activity, Radar, Sun, Bell } from "lucide-react"

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const systems = [
    {
      id: "disaster-response",
      title: "Earth Watch",
      description: "Monitor floods and landslides from space. Get alerts when disasters happen.",
      icon: Satellite,
      status: "ACTIVE",
      features: ["Flood Detection", "Land Monitoring", "Quick Alerts", "Mobile Access"],
      href: "/disaster-response",
    },
    {
      id: "debris-monitoring",
      title: "Space Safety",
      description: "Track space debris and avoid collisions. Keep our satellites safe.",
      icon: Shield,
      status: "ACTIVE",
      features: ["Debris Tracking", "Collision Alerts", "Safety Plans", "Live Updates"],
      href: "/debris-monitoring",
    },
    {
      id: "astronaut-health",
      title: "Crew Health",
      description: "Monitor astronaut health in real-time. Medical support for space missions.",
      icon: Activity,
      status: "TESTING",
      features: ["Health Monitor", "Medical AI", "Life Support", "Health Alerts"],
      href: "/astronaut-health",
    },
    {
      id: "spacecraft-telemetry",
      title: "Spacecraft Health",
      description: "Monitor spacecraft systems. Detect and fix problems automatically.",
      icon: Radar,
      status: "ACTIVE",
      features: ["System Check", "Auto Repair", "Problem Alerts", "Smart Fix"],
      href: "/spacecraft-telemetry",
    },
    {
      id: "space-weather",
      title: "Solar Watch",
      description: "Track solar storms and protect our spacecraft from space weather.",
      icon: Sun,
      status: "ACTIVE",
      features: ["Solar Monitor", "Storm Alerts", "Auto Protection", "Weather Forecast"],
      href: "/space-weather",
    },
  ]

  const getCurrentIST = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-IN", {
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Top Navigation */}
      <nav className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 ml-16">
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium">OrbitX6</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-orange-600 text-white border border-orange-500">MISSION READY</Badge>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-0">
        <header className="border-b border-slate-800/50 bg-gradient-to-r from-slate-950 to-slate-900">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light mb-2 text-white">OrbitX6 Control Center</h1>
                <p className="text-slate-400">Real-time monitoring for advanced space operations</p>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-slate-400">Current Time IST</div>
                <div className="text-lg font-mono text-white">{getCurrentIST()}</div>
                <div className="text-xs mt-1 text-slate-400">Indian Standard Time</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* System Cards - Vertical Layout with improved spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {systems.map((system, index) => (
              <div key={system.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <FlipCard
                  id={system.id}
                  title={system.title}
                  description={system.description}
                  icon={system.icon}
                  status={system.status}
                  features={system.features}
                  href={system.href}
                  isDarkMode={isDarkMode}
                />
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "24/7", label: "Monitoring" },
              { value: "99.9%", label: "Uptime" },
              { value: "847", label: "Objects Tracked" },
              { value: "12", label: "Active Missions" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-lg border bg-gradient-to-br from-slate-950/50 to-slate-800/30 border-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="text-2xl font-mono mb-1 text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Powered by OrbitX6 • Real-time Mission Data
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-slate-500">System Status: Normal</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
