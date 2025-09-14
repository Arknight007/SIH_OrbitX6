"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  FileText,
  Users,
  Phone,
  Settings,
  Bell,
  UserIcon,
  Menu,
  X,
  Sun,
  Moon,
  Satellite,
  Shield,
  Activity,
  Radar,
  Zap,
  LogOut,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface CollapsibleSidebarProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export function CollapsibleSidebar({ isDarkMode, toggleDarkMode }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home, description: "Mission overview" },
    { name: "Earth Watch", href: "/disaster-response", icon: Satellite, description: "Disaster monitoring" },
    { name: "Space Safety", href: "/debris-monitoring", icon: Shield, description: "Debris tracking" },
    { name: "Crew Health", href: "/astronaut-health", icon: Activity, description: "Health monitoring" },
    { name: "Spacecraft", href: "/spacecraft-telemetry", icon: Radar, description: "System telemetry" },
    { name: "Solar Watch", href: "/space-weather", icon: Zap, description: "Space weather" },
    { name: "About", href: "/about", icon: FileText, description: "Mission details" },
    { name: "Team", href: "/team", icon: Users, description: "Crew profiles" },
    { name: "Contact", href: "/contact", icon: Phone, description: "Support" },
    { name: "Settings", href: "/settings", icon: Settings, description: "Preferences" },
  ]

  const getCurrentIST = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-IN", {
      hour12: false,
      timeZone: "Asia/Kolkata",
    })
  }

  return (
    <>
      {/* Mobile/Desktop Toggle Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-4 left-4 z-50 transition-all duration-300 ${isDarkMode ? "text-white hover:bg-gray-800" : "text-gray-900 hover:bg-gray-100"}`}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={`fixed left-0 top-0 h-full w-72 z-40 ${
              isDarkMode ? "bg-gray-950/95 border-gray-800" : "bg-white/95 border-gray-200"
            } border-r backdrop-blur-sm overflow-y-auto`}
          >
            <div className="p-6">
              {/* Logo & Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 pt-12"
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 w-10 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src="/images/space-logo-large.jpg"
                      alt="OrbitX6"
                      width={32}
                      height={32}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to satellite icon if image fails to load
                        e.currentTarget.style.display = "none"
                        e.currentTarget.nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                    <Satellite className="h-6 w-6 text-white hidden" />
                  </motion.div>
                  <div>
                    <div className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>OrbitX6</div>
                    <div className={`text-sm ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>
                      Space Operations
                    </div>
                  </div>
                </div>
              </motion.div>

              {!isLoading && user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-6 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {user.user_metadata?.first_name || user.email?.split("@")[0] || "Astronaut"}
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>
                        Mission Operator
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <nav className="mb-8">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                            isDarkMode
                              ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </nav>

              {/* Mission Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3
                  className={`text-xs uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Mission Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>OrbitX6-1</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs border-green-500/30">READY</Badge>
                  </div>
                  <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Space Operations Program
                  </div>
                  <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Launch: Advanced Systems
                    <br />
                    Duration: Continuous
                  </div>
                </div>
              </motion.div>

              {/* Current Time IST */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h3
                  className={`text-xs uppercase tracking-wide mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Current Time
                </h3>
                <div className={`text-sm font-mono ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {getCurrentIST()} IST
                </div>
                <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Indian Standard Time</div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Link href="/alerts" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start gap-2 transition-all duration-200 hover:scale-105 ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                    Alerts
                    <Badge className="ml-auto bg-red-500/20 text-red-400 text-xs">3</Badge>
                  </Button>
                </Link>

                {!isLoading &&
                  (user ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className={`w-full justify-start gap-2 transition-all duration-200 hover:scale-105 ${
                        isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start gap-2 transition-all duration-200 hover:scale-105 ${
                          isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <UserIcon className="h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  ))}

                {/* Dark/Light Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className={`w-full justify-start gap-2 transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <motion.div animate={{ rotate: isDarkMode ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </motion.div>
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
