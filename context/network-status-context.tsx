"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type NetworkStatus = "online" | "offline" | "loading"

interface NetworkStatusContextType {
  status: NetworkStatus
  setStatus: (status: NetworkStatus) => void
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  status: "loading",
  setStatus: () => {},
})

export function NetworkStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<NetworkStatus>("loading")

  // Listen for browser online/offline events
  useEffect(() => {
    const handleOnline = () => {
      // Only set to online if we're not explicitly set to offline by the app
      if (status !== "offline") {
        setStatus("online")
      }
    }

    const handleOffline = () => {
      setStatus("offline")
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Set initial status based on navigator.onLine
    if (navigator.onLine && status === "loading") {
      setStatus("online")
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [status])

  return <NetworkStatusContext.Provider value={{ status, setStatus }}>{children}</NetworkStatusContext.Provider>
}

export function useNetworkStatus() {
  return useContext(NetworkStatusContext)
}

