"use client"

import { getAirdropCollectionById } from "@/lib/supabase-queries"
import { isSupabaseConfigured } from "@/lib/supabase"
import Image from "next/image"
import { FileText, Users, AlertTriangle, ArrowLeft, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import AirdropSkeleton from "@/components/ui/airdrop-skeleton"

// Function to check if a project is new (added within the last 7 days)
function isNewProject(createdAt: string): boolean {
  if (!createdAt) return false

  const createdDate = new Date(createdAt)
  const currentDate = new Date()

  // Calculate the difference in days
  const differenceInTime = currentDate.getTime() - createdDate.getTime()
  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  // Return true if the project was created within the last 7 days
  return differenceInDays <= 7
}

export default function AirdropPage({ params }: { params: { id: string } }) {
  const [airdrop, setAirdrop] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAirdrop() {
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          throw new Error("Supabase configuration is missing")
        }

        // Add artificial delay to show loading state (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Fetch airdrop data
        const data = await getAirdropCollectionById(params.id)

        if (!data) {
          throw new Error("Airdrop not found")
        }

        setAirdrop(data)
      } catch (err: any) {
        setError(err.message || "Failed to load airdrop")
        console.error("Error fetching airdrop:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAirdrop()
  }, [params.id])

  // Show loading skeleton
  if (loading) {
    return <AirdropSkeleton />
  }

  // Show error state
  if (error) {
    return (
      <main className="min-h-screen p-4 sm:p-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 text-red-500 text-sm">
            {error === "Airdrop not found" ? "This airdrop could not be found." : error}
          </div>
          <div className="mt-4">
            <Link href="/" className="text-primary hover:underline flex items-center gap-2 py-2">
              <ArrowLeft size={16} />
              <span>Back to all airdrops</span>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Mock data toggle
  const usingMockData = false

  // Safely access airdrop properties
  const safeAirdrop = airdrop || {}

  // Process requirements data
  const requirements = Array.isArray(airdrop.requirements)
    ? airdrop.requirements
    : typeof airdrop.requirements === "object"
      ? Object.entries(airdrop.requirements).map(([key, value]) => ({
          title: key,
          description: value,
        }))
      : []

  // Process steps data
  const steps = Array.isArray(airdrop.how_to_steps)
    ? airdrop.how_to_steps
    : typeof airdrop.how_to_steps === "object"
      ? Object.entries(airdrop.how_to_steps).map(([key, value]) => ({
          title: key,
          description: value,
        }))
      : []

  return (
    <main className="min-h-screen bg-background text-foreground">
      {usingMockData && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4 mx-3 sm:mx-4 my-3 sm:my-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-amber-700 dark:text-amber-400 font-medium">Using demo data</p>
            <p className="text-amber-600 dark:text-amber-500 text-sm mt-1">
              We're currently experiencing high traffic or API rate limits. Showing demo data instead of live data.
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Banner Section */}
      <div className="relative">
        {/* Dynamic Banner Image */}
        <div className="h-32 sm:h-60 md:h-80 relative overflow-hidden">
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />

          {/* Banner image from Supabase */}
          {safeAirdrop.image_cover ? (
            <Image
              src={safeAirdrop.image_cover || "/placeholder.svg"}
              alt={`${safeAirdrop.name} banner`}
              fill
              className="object-cover object-center"
              priority
            />
          ) : safeAirdrop.image_url ? (
            // Fallback to project image with blur effect if no cover image
            <div className="relative h-full w-full">
              <Image
                src={safeAirdrop.image_url || "/placeholder.svg"}
                alt={`${safeAirdrop.name} banner`}
                fill
                className="object-cover object-center blur-sm scale-110"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ) : (
            // Gradient fallback
            <div className="h-full w-full bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900" />
          )}

          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background to-transparent z-10" />
        </div>

        {/* Profile content with improved layout */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="relative -mt-14 sm:-mt-20 md:-mt-24 z-20 flex flex-col items-center">
            {/* Project logo with enhanced styling */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-background rounded-full mb-3 sm:mb-4 overflow-hidden border-4 border-background shadow-lg shadow-purple-900/20 flex items-center justify-center">
              {safeAirdrop.image_url ? (
                <Image
                  src={safeAirdrop.image_url || "/placeholder.svg"}
                  alt={safeAirdrop.name}
                  width={96}
                  height={96}
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="text-xl sm:text-2xl font-bold text-foreground">{safeAirdrop.name.charAt(0)}</span>
              )}
            </div>

            {/* Project metadata with improved typography */}
            <div className="text-center">
              {/* Project name with stronger presence */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  {safeAirdrop.name}
                </h2>
                {isNewProject(safeAirdrop.created_at) && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full">
                    NEW
                  </span>
                )}
              </div>

              {/* Subtitle with improved readability */}
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mb-4 px-2 sm:px-0">
                {safeAirdrop.subtitle}
              </p>

              {/* Project metadata badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {safeAirdrop.chain && (
                  <span className="px-2 py-1 bg-purple-900/30 border border-purple-500/30 rounded-full text-xs text-purple-300 dark:text-purple-300 text-purple-700">
                    {safeAirdrop.chain}
                  </span>
                )}
                {safeAirdrop.stage && (
                  <span className="px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs text-blue-700 dark:text-blue-300">
                    {safeAirdrop.stage}
                  </span>
                )}
                {safeAirdrop.cost === 0 ? (
                  <span className="px-2 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-700 dark:text-green-300">
                    Free
                  </span>
                ) : safeAirdrop.cost ? (
                  <span className="px-2 py-1 bg-amber-900/30 border border-amber-500/30 rounded-full text-xs text-amber-700 dark:text-amber-300">
                    ${safeAirdrop.cost}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-10 -mt-6 sm:-mt-8 relative z-10">
        {/* Project description */}
        {safeAirdrop.description && (
          <div className="mb-5 sm:mb-8 p-3 sm:p-6 bg-secondary/50 rounded-lg text-secondary-foreground">
            <p className="leading-relaxed text-sm sm:text-base text-center">{safeAirdrop.description}</p>
          </div>
        )}

        {/* Separator line */}
        <div className="h-px bg-border w-full my-6 sm:my-10"></div>

        {/* Project Image Section */}
        <div className="mb-5 sm:mb-8">
          <div className="bg-secondary/30 p-3 sm:p-4 rounded-lg flex justify-center">
            <div className="relative w-full max-w-2xl h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden">
              {safeAirdrop.proj_img ? (
                <Image
                  src={safeAirdrop.proj_img || "/placeholder.svg"}
                  alt={`${safeAirdrop.name} project image`}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/50 rounded-lg">
                  <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">No project image available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Requirements section */}
        <div className="mb-4 sm:mb-8">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            Requirements
          </h2>
          <ul className="space-y-2 sm:space-y-3 text-foreground">
            {requirements.length > 0 ? (
              requirements
                .filter((req) => {
                  // Filter out empty requirements
                  if (!req) return false
                  if (typeof req === "string") return req.trim() !== ""
                  return req.title || req.description
                })
                .map((req: any, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 bg-secondary/30 p-2 sm:p-3 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      {typeof req === "string" ? (
                        <span className="text-sm sm:text-base">{req}</span>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base font-medium">{req.title}</span>
                          {req.description && (
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{req.description}</p>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-muted-foreground text-sm bg-secondary/30 p-3 rounded-lg">
                No specific requirements listed.
              </li>
            )}
          </ul>
        </div>

        {/* How to Steps section */}
        <div className="mb-4 sm:mb-8">
          <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
            <FileText className="w-5 h-5 text-primary" />
            How to Steps
          </h2>
          <div className="space-y-3">
            {steps.length > 0 ? (
              steps
                .filter((step) => {
                  // Filter out empty steps
                  if (!step) return false
                  if (typeof step === "string") return step.trim() !== ""
                  return step.title || step.description
                })
                .map((step: any, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 bg-secondary/30 p-2 sm:p-3 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      {typeof step === "string" ? (
                        <div className="text-sm sm:text-base">{step}</div>
                      ) : (
                        <>
                          <div className="text-sm sm:text-base font-medium">{step.title}</div>
                          {step.description && (
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground text-sm bg-secondary/30 p-3 rounded-lg">No specific steps listed.</p>
            )}
          </div>
        </div>

        {/* Backers section - simplified */}
        {safeAirdrop.backers && safeAirdrop.backers.length > 0 && (
          <div className="mb-5 sm:mb-8">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">
              <Users className="w-5 h-5 text-primary" />
              Backers
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {safeAirdrop.backers.map((backer, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3 bg-secondary/30 p-2 sm:p-3 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base">{backer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modern Footer */}
        <div className="mt-6 sm:mt-12 border-t border-border pt-4 sm:pt-6">
          {/* Comment section - from nd_comment field */}
          {safeAirdrop.nd_comment && (
            <div className="mb-5 sm:mb-8">
              <div className="bg-secondary/30 p-3 sm:p-6 rounded-lg">
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-center">
                  {safeAirdrop.nd_comment}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 bg-secondary/50 rounded-full"
              >
                <ArrowLeft size={14} />
                <span>Back to all airdrops</span>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left w-full sm:w-auto">
              {safeAirdrop.chain && (
                <span className="text-xs sm:text-sm text-muted-foreground">Available on {safeAirdrop.chain}</span>
              )}
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                Added {new Date(safeAirdrop.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

