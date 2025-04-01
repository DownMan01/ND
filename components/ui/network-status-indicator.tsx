"use client"

import { useNetworkStatus } from "@/context/network-status-context"

export default function NetworkStatusIndicator() {
  const { status } = useNetworkStatus()

  return (
    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-secondary/50 rounded-full text-xs text-muted-foreground border border-border/50">
      <span
        className={`inline-block w-2 h-2 rounded-full mr-1 animate-pulse ${
          status === "online" ? "bg-green-500" : status === "offline" ? "bg-red-500" : "bg-yellow-500"
        }`}
      />
      <span>Network: {status === "online" ? "Online" : status === "offline" ? "Offline" : "Connecting..."}</span>
    </div>
  )
}

