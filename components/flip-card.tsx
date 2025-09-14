"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface FlipCardProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  status: string
  features: string[]
  href: string
  isDarkMode: boolean
  showOpenButton?: boolean // Added prop to conditionally show Open System button
}

export function FlipCard({
  title,
  description,
  icon: Icon,
  status,
  features,
  href,
  showOpenButton = true,
}: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[500px] w-full cursor-pointer"
    >
      <Card className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-slate-700/50 shadow-2xl transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:rotate-[-1deg] group-hover:shadow-3xl group-hover:border-slate-600/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
        </div>

        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-6 text-center transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Large animated icon */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isHovered ? "scale-150 blur-sm animate-bounce" : "scale-100 blur-0"
            }`}
          >
            <Icon className="h-32 w-32 text-slate-600" />
          </div>

          {/* Title and status */}
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-slate-300">{title}</h3>
            <Badge
              className={`text-xs font-semibold ${
                status === "ACTIVE"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-amber-600 text-white border-amber-500"
              }`}
            >
              {status}
            </Badge>
          </div>
        </div>

        <div
          className={`absolute inset-0 z-20 flex flex-col transition-all duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Header Section */}
          <div className="p-6 flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <Badge
                  className={`text-xs font-semibold ${
                    status === "ACTIVE"
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-amber-600 text-white border-amber-500"
                  }`}
                >
                  {status}
                </Badge>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Features Section */}
          <div className="px-6 flex-1 flex flex-col justify-center">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300 uppercase tracking-wide">Key Features</h4>
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showOpenButton && (
            <div className="p-6 border-t border-slate-700/50 bg-slate-900/50">
              <Link href={href}>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open System
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Hover Overlay Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </Card>
    </div>
  )
}
