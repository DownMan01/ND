"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function AirdropSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Banner skeleton */}
      <div className="h-40 sm:h-60 md:h-80 relative overflow-hidden bg-gradient-to-r from-gray-900/50 via-purple-900/30 to-gray-900/50">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      {/* Profile content skeleton */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-20 flex flex-col items-center">
          {/* Project logo skeleton */}
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mb-4" />

          {/* Project metadata skeleton */}
          <div className="text-center w-full">
            <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mx-auto mb-2" />
            <Skeleton className="h-4 sm:h-5 w-64 sm:w-80 max-w-full mx-auto mb-6" />

            {/* Badge skeletons */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 -mt-6 sm:-mt-8 relative z-10">
        {/* Description skeleton */}
        <Skeleton className="h-24 w-full mb-8 rounded-lg" />

        {/* Separator */}
        <div className="h-px bg-border/50 w-full my-8"></div>

        {/* Requirements section skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        {/* How to steps skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        {/* Backers skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-8 sm:mt-16 border-t border-border pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Skeleton className="h-8 w-32 rounded-full" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

