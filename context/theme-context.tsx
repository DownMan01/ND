"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isReady: boolean
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isReady: false,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark") // Default to dark
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme") as Theme | null

    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // If no stored theme, check system preference but default to dark
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      // Even if system prefers light, we'll default to dark as requested
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    }

    // Apply theme to document
    document.documentElement.classList.toggle("dark", storedTheme === "dark" || !storedTheme)

    setIsReady(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, isReady }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}

