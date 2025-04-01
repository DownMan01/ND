"use client"

import { motion } from "framer-motion"

export default function FloatingCircle() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 30 }).map((_, index) => {
        // Random positions and sizes for each circle
        const size = Math.floor(Math.random() * 20) + 20 // Size between 20px and 40px
        const initialX = Math.random() * 100 // Random X position (0-100%)
        const initialY = Math.random() * 100 // Random Y position (0-100%)
        const duration = Math.random() * 10 + 10 // Animation duration between 10-20s
        const delay = Math.random() * 5 // Random delay for animation start

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary shadow-md flex items-center justify-center opacity-30"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${initialX}%`,
              top: `${initialY}%`,
              fontSize: `${size / 2}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-10"></div>
            <span className="text-white font-bold">N</span>
          </motion.div>
        )
      })}
    </div>
  )
}

