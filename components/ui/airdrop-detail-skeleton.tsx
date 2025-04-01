import { Skeleton } from "@/components/ui/skeleton"

export default function AirdropDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <Skeleton className="h-8 w-32 mb-8" />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Skeleton className="w-full md:w-64 h-64 rounded-2xl" />

          <div className="flex-1">
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />

            <div className="flex gap-6 mb-8">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>

          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

