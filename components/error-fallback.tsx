"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface ErrorFallbackProps {
  message?: string
  retry?: boolean
  isRateLimit?: boolean
}

export default function ErrorFallback({
  message = "We encountered an issue while loading the data. Please try again later.",
  retry = true,
  isRateLimit = false,
}: ErrorFallbackProps) {
  const router = useRouter()
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = () => {
    setIsRetrying(true)

    // Add a small delay to make the retry feel more substantial
    setTimeout(() => {
      router.refresh()
      setIsRetrying(false)
    }, 1000)
  }

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 my-8">
      <h2 className="text-red-800 dark:text-red-400 font-medium text-lg mb-3">Error Loading Data</h2>
      <p className="text-red-600 dark:text-red-300 mb-4">{message}</p>

      {isRateLimit && (
        <div className="mb-4 text-sm text-red-500 dark:text-red-400">
          <p>This error occurs when there are too many requests to our database.</p>
          <ul className="list-disc list-inside mt-2 ml-2">
            <li>Wait a few moments before trying again</li>
            <li>Refresh the page</li>
            <li>Try again later if the issue persists</li>
          </ul>
        </div>
      )}

      {retry && (
        <div className="flex justify-center">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>
        </div>
      )}
    </div>
  )
}

