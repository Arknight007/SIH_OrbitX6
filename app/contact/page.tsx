"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/collapsible-sidebar"
import { FlipCard } from "@/components/flip-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, Bell, Phone, MapPin, Clock, AlertTriangle, Headphones } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
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

  const contactInfo = [
    {
      id: "mission-control",
      title: "Mission Control",
      description: "Primary mission control and coordination center",
      icon: Phone,
      status: "ACTIVE",
      features: ["+91-80-2217-2056", "ISRO Headquarters", "Bangalore, Karnataka"],
      href: "/contact/mission-control",
    },
    {
      id: "emergency-support",
      title: "Emergency Support",
      description: "Critical alerts and emergency response team",
      icon: AlertTriangle,
      status: "ACTIVE",
      features: ["+91-44-2230-2000", "SDSC SHAR", "Sriharikota, Andhra Pradesh"],
      href: "/contact/emergency",
    },
    {
      id: "technical-help",
      title: "Technical Help",
      description: "System support and technical assistance",
      icon: Headphones,
      status: "ACTIVE",
      features: ["support@isro.gov.in", "Technical Support", "9 AM - 6 PM IST"],
      href: "/contact/technical",
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
                  Mission Support
                </h1>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Contact ISRO mission control and support teams
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.1,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
              >
                <FlipCard
                  id={contact.id}
                  title={contact.title}
                  description={contact.description}
                  icon={contact.icon}
                  status={contact.status}
                  features={contact.features}
                  href={contact.href}
                  isDarkMode={isDarkMode}
                />
              </motion.div>
            ))}
          </div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Card className={`transition-all duration-300 bg-gray-900 border-gray-700 hover:border-gray-600`}>
              <CardHeader>
                <CardTitle className="text-lg font-light text-white">ISRO Headquarters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Antariksh Bhavan, New BEL Road, Bangalore - 560231</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-400">24/7 Mission Operations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-300 bg-gray-900 border-gray-700 hover:border-gray-600`}>
              <CardHeader>
                <CardTitle className="text-lg font-light text-white">Launch Center</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-400">SDSC SHAR, Sriharikota, Andhra Pradesh - 524124</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Launch Operations Center</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
