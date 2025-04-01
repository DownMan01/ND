"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/theme-context"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 z-50 ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700 focus:ring-primary focus:ring-offset-gray-900"
              : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 focus:ring-primary focus:ring-offset-white"
          }`}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={20} className={isDarkMode ? "text-primary" : "text-primary"} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

