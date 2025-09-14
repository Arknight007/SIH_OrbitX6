"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  isDarkMode?: boolean
  className?: string
}

export function BackButton({ isDarkMode = true, className = "" }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const buttonClasses = isDarkMode
    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
    : "border-gray-300 text-gray-700 hover:bg-gray-100"

  return (
    <Button variant="outline" size="sm" onClick={handleBack} className={`${buttonClasses} ${className}`}>
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  )
}
