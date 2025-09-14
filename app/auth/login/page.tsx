"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
        },
      })
      if (error) throw error
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // --- Base classes for consistent styling ---
  const cardClasses = "bg-gray-950/50 border-gray-800/50 backdrop-blur-lg"
  const textPrimary = "text-white"
  const textSecondary = "text-gray-400"
  const buttonPrimaryClasses = "bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
  const inputClasses = "bg-gray-900/80 border-gray-700 focus:border-orange-500 focus:ring-orange-500"
  const alertErrorClasses = "border-red-500/50 bg-red-900/50 text-red-300"

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black p-4 overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 z-0">
        {/* Static distant stars */}
        {[...Array(200)].map((_, i) => (
          <div
            key={`dist-star-${i}`}
            className="absolute rounded-full bg-white/40 animate-pulse"
            style={{
              width: `${Math.random() * 1.5}px`,
              height: `${Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        {/* Drifting closer stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white/80"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              scale: Math.random() * 0.7 + 0.3,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{ y: "-=100vh" }}
            transition={{
              duration: 30 + Math.random() * 40,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * -80,
            }}
          />
        ))}
        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="absolute h-0.5 w-24 bg-gradient-to-l from-transparent to-white/60"
            initial={{
              x: "100vw",
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              rotate: -15,
              opacity: 0,
            }}
            animate={{ x: "-20vw", opacity: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 5 + Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 w-full max-w-lg"
      >
        <Card className={`${cardClasses} transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10`}>
          <CardHeader className="text-center space-y-4 pt-10 pb-6">
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image__1_-removebg-preview-1zloMBt36I27tRTzPcE3lOs5LrpdmE.png"
                alt="Space Operations Logo"
                width={120}
                height={120}
                className="object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
            <CardDescription className={`${textSecondary} text-base pt-2`}>
              Please authenticate to access the dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-10 pb-10">
            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div className="space-y-2" variants={formVariants} initial="hidden" animate="visible" custom={1}>
                <Label htmlFor="email" className={textSecondary}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@agency.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={formVariants} initial="hidden" animate="visible" custom={2}>
                <Label htmlFor="password" className={textSecondary}>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                />
              </motion.div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Alert className={alertErrorClasses}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Authentication Failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={formVariants} initial="hidden" animate="visible" custom={3}>
                <Button type="submit" className={`w-full ${buttonPrimaryClasses}`} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                    </>
                  ) : (
                    "Access Control"
                  )}
                </Button>
              </motion.div>

              <motion.div variants={formVariants} initial="hidden" animate="visible" custom={6} className="text-center">
                <p className={`text-sm ${textSecondary}`}>
                  Don't have an account?{" "}
                  <Link href="/auth/sign-up" className="text-orange-400 hover:text-orange-300 underline">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
