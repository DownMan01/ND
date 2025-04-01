"use client"

import { getPaginatedAirdropCollections } from "@/lib/supabase-queries"
import { isSupabaseConfigured } from "@/lib/supabase"
import { Suspense } from "react"
import AirdropTable from "@/components/airdrop-table"
import ErrorFallback from "@/components/error-fallback"
import FaqAccordion from "@/components/faq-accordion"
import ScrollToTop from "@/components/scroll-to-top"
import { motion } from "framer-motion"
// import FloatingCircle from "@/components/floating-circle"

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search?: string
    chain?: string
    cost?: string
    stage?: string
  }
}) {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen py-6 sm:py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Web3 Airdrop Database
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
              Discover and track the latest blockchain projects, airdrops, and protocols.
            </p>
          </div>

          <ErrorFallback
            message="Supabase configuration is missing. Please check your environment variables."
            retry={false}
          />
        </div>
      </main>
    )
  }

  const page = 1
  const pageSize = 20

  try {
    // Fetch initial data directly from Supabase
    const { data: airdrops, count } = await getPaginatedAirdropCollections(page, pageSize)

    return (
      <main className="min-h-screen bg-background">
        {/* Add the floating circle */}
        {/* <FloatingCircle /> */}

        {/* Enhanced Banner Section for Dark Mode */}
        <div className="relative h-36 sm:h-60 md:h-80 overflow-hidden bg-gradient-to-r from-primary/10 via-purple-600/20 to-primary/10 dark:from-primary/20 dark:via-purple-800/30 dark:to-primary/20">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pt-6 sm:pt-10 md:pt-12">
            <div className="relative mb-2 sm:mb-4">
              {/* Enhanced gradient text for dark mode */}
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-4xl tracking-tight">
                <span className="gradient-text">Web3 Airdrop Database</span>
              </h1>
              {/* Enhanced glow effect for dark mode */}
              <div className="absolute -inset-1 blur-md bg-primary/10 dark:bg-primary/20 -z-10 rounded-full"></div>
            </div>

            <p className="text-sm sm:text-base md:text-xl text-foreground max-w-2xl">
              Discover and track the latest{" "}
              <span className="font-medium relative inline-block">
                blockchain projects, airdrops, and protocols
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 dark:via-primary/50 to-transparent"></span>
              </span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-8">
          <Suspense fallback={<div className="text-center py-10">Loading airdrops...</div>}>
            <AirdropTable airdrops={airdrops || []} />
          </Suspense>

          {/* FAQ Section with enhanced dark mode styling */}
          <motion.section
            className="mt-12 sm:mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
                Everything you need to know about Web3 airdrops and how to participate in them.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto px-2 sm:px-0">
              <FaqAccordion />
            </div>
          </motion.section>

          {/* Scroll to top button */}
          <ScrollToTop />
        </div>
      </main>
    )
  } catch (error: any) {
    console.error("Error in Home component:", error)

    // Check if it's a rate limit error
    const isRateLimit = error?.message?.includes("Too Many Requests") || error?.status === 429

    // Fallback UI in case of error
    return (
      <main className="min-h-screen py-6 sm:py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Web3 Airdrop Database
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
              Discover and track the latest blockchain projects, airdrops, and protocols.
            </p>
          </div>

          <ErrorFallback
            message={
              isRateLimit
                ? "We're experiencing high traffic. Please try again in a moment."
                : "There was an error loading the data. Please try again later."
            }
          />
        </div>
      </main>
    )
  }
}

