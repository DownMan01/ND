"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export default function ThemeToggle() {
  const { theme, toggleTheme, isReady } = useTheme()

  // Show a placeholder while the theme is loading
  if (!isReady) {
    return (
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary flex items-center justify-center">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-muted-foreground/20"></div>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors ${
        theme === "dark" ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" : "bg-gray-100 hover:bg-gray-200"
      }`}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Moon size={16} className="text-primary" /> : <Sun size={16} className="text-amber-500" />}
    </button>
  )
}

