"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { AirdropCollection } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"
import { Search, Users, ExternalLink, Filter, X, ChevronDown } from "lucide-react"
import { useNetworkStatus } from "@/context/network-status-context"

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

interface AirdropTableProps {
  airdrops: AirdropCollection[]
  onLoadMore?: () => void
}

export default function AirdropTable({ airdrops, onLoadMore }: AirdropTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setStatus } = useNetworkStatus()

  // Update network status based on airdrops data
  useEffect(() => {
    // If we have airdrops data, set status to online
    if (airdrops && airdrops.length > 0) {
      setStatus("online")
    } else {
      // If no airdrops data, set status to offline
      setStatus("offline")
    }
  }, [airdrops, setStatus])

  // Get filter values from URL
  const initialSearchTerm = searchParams?.get("search") || ""
  const initialChainFilter = searchParams?.get("chain") || ""
  const initialCostFilter = searchParams?.get("cost") || ""
  const initialStageFilter = searchParams?.get("stage") || ""
  const initialNewFilter = searchParams?.get("new") || ""

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [chainFilter, setChainFilter] = useState(initialChainFilter)
  const [costFilter, setCostFilter] = useState(initialCostFilter)
  const [stageFilter, setStageFilter] = useState(initialStageFilter)
  const [newFilter, setNewFilter] = useState(initialNewFilter)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearchTerm)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Get unique chains and stages for filters
  const chains = [...new Set(airdrops.map((airdrop) => airdrop.chain || "").filter(Boolean))]
  const stages = [...new Set(airdrops.map((airdrop) => airdrop.stage || "").filter(Boolean))]

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Update URL when filters change
  useEffect(() => {
    if (!router || !pathname || !searchParams) return

    const params = new URLSearchParams()

    if (debouncedSearchTerm) params.set("search", debouncedSearchTerm)
    if (chainFilter) params.set("chain", chainFilter)
    if (costFilter) params.set("cost", costFilter)
    if (stageFilter) params.set("stage", stageFilter)
    if (newFilter) params.set("new", newFilter)

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }, [debouncedSearchTerm, chainFilter, costFilter, stageFilter, newFilter, router, pathname, searchParams])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setChainFilter("")
    setCostFilter("")
    setStageFilter("")
    setNewFilter("")
    setShowMobileFilters(false)
  }

  // Count active filters
  const activeFilterCount = [chainFilter, costFilter, stageFilter, newFilter].filter(Boolean).length

  // Filter airdrops based on search term and filters
  const filteredAirdrops = airdrops.filter((airdrop) => {
    const name = airdrop.name || ""
    const subtitle = airdrop.subtitle || ""
    const chain = (airdrop.chain || "").toLowerCase()
    const stage = (airdrop.stage || "").toLowerCase()
    const cost = airdrop.cost ?? 0
    const isNew = isNewProject(airdrop.created_at)

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) || subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChain = chainFilter ? chain === chainFilter.toLowerCase() : true
    const matchesCost = costFilter ? (costFilter === "FREE" ? cost === 0 : cost > 0) : true
    const matchesStage = stageFilter ? stage === stageFilter.toLowerCase() : true
    const matchesNew = newFilter ? (newFilter === "true" ? isNew : true) : true

    return matchesSearch && matchesChain && matchesCost && matchesStage && matchesNew
  })

  // Add this right after the filter function to debug
  useEffect(() => {
    if (chainFilter || costFilter || stageFilter || newFilter) {
      console.log("Active filters:", {
        chainFilter,
        costFilter,
        stageFilter,
        newFilter,
        filteredCount: filteredAirdrops.length,
        totalCount: airdrops.length,
      })
    }
  }, [chainFilter, costFilter, stageFilter, newFilter, filteredAirdrops.length, airdrops.length])

  // Implement infinite scroll
  useEffect(() => {
    if (!onLoadMore) return

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        onLoadMore()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onLoadMore])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openDropdown) return

      const target = event.target as Element
      if (!target.closest(".filter-dropdown")) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])

  if (!airdrops || airdrops.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No airdrops available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Filter Bar */}
      <div className="hidden md:block mb-6">
        <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Filter size={16} />
              <span className="font-medium">Filters</span>
            </div>

            <div className="relative filter-dropdown">
              <button
                onClick={() => setOpenDropdown(openDropdown === "chain" ? null : "chain")}
                className="px-3 py-2 rounded-lg text-sm border border-border bg-background text-foreground flex items-center gap-1.5"
              >
                <span>Chain</span>
                <ChevronDown
                  size={14}
                  className={
                    openDropdown === "chain" ? "transform rotate-180 transition-transform" : "transition-transform"
                  }
                />
              </button>
              {openDropdown === "chain" && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[160px] filter-dropdown">
                  <button
                    onClick={() => {
                      setChainFilter("")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${!chainFilter ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    All Chains
                  </button>
                  {chains.map((chain) => (
                    <button
                      key={chain}
                      onClick={() => {
                        setChainFilter(chain)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm ${chainFilter === chain ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                    >
                      {chain}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative filter-dropdown">
              <button
                onClick={() => setOpenDropdown(openDropdown === "cost" ? null : "cost")}
                className="px-3 py-2 rounded-lg text-sm border border-border bg-background text-foreground flex items-center gap-1.5"
              >
                <span>Cost</span>
                <ChevronDown
                  size={14}
                  className={
                    openDropdown === "cost" ? "transform rotate-180 transition-transform" : "transition-transform"
                  }
                />
              </button>
              {openDropdown === "cost" && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[160px] filter-dropdown">
                  <button
                    onClick={() => {
                      setCostFilter("")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${!costFilter ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    All Costs
                  </button>
                  <button
                    onClick={() => {
                      setCostFilter("FREE")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${costFilter === "FREE" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    FREE
                  </button>
                  <button
                    onClick={() => {
                      setCostFilter("PAID")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${costFilter === "PAID" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    PAID
                  </button>
                </div>
              )}
            </div>

            <div className="relative filter-dropdown">
              <button
                onClick={() => setOpenDropdown(openDropdown === "stage" ? null : "stage")}
                className="px-3 py-2 rounded-lg text-sm border border-border bg-background text-foreground flex items-center gap-1.5"
              >
                <span>Stage</span>
                <ChevronDown
                  size={14}
                  className={
                    openDropdown === "stage" ? "transform rotate-180 transition-transform" : "transition-transform"
                  }
                />
              </button>
              {openDropdown === "stage" && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[160px] filter-dropdown">
                  <button
                    onClick={() => {
                      setStageFilter("")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${!stageFilter ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    All Stages
                  </button>
                  {stages.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => {
                        setStageFilter(stage)
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm ${stageFilter === stage ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative filter-dropdown">
              <button
                onClick={() => setOpenDropdown(openDropdown === "new" ? null : "new")}
                className="px-3 py-2 rounded-lg text-sm border border-border bg-background text-foreground flex items-center gap-1.5"
              >
                <span>New Projects</span>
                <ChevronDown
                  size={14}
                  className={
                    openDropdown === "new" ? "transform rotate-180 transition-transform" : "transition-transform"
                  }
                />
              </button>
              {openDropdown === "new" && (
                <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[160px] filter-dropdown">
                  <button
                    onClick={() => {
                      setNewFilter("")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${!newFilter ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    All Projects
                  </button>
                  <button
                    onClick={() => {
                      setNewFilter("true")
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${newFilter === "true" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                  >
                    New Only
                  </button>
                </div>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 bg-secondary/80 hover:bg-secondary text-foreground rounded-lg text-sm transition-colors"
                aria-label={`Clear ${activeFilterCount} active filters`}
              >
                <X size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bar */}
      <div className="md:hidden mb-5">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary text-foreground text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm ${
              activeFilterCount > 0
                ? "bg-primary text-primary-foreground"
                : "bg-background border border-border text-foreground"
            }`}
            aria-expanded={showMobileFilters}
            aria-controls="mobile-filters"
          >
            <Filter size={14} />
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center bg-white text-primary w-4 h-4 rounded-full text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div
            id="mobile-filters"
            className="bg-card border border-border rounded-lg mt-2 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground">Filters</h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs text-primary hover:underline"
                >
                  <X size={12} />
                  <span>Clear all</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Chain</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setChainFilter("")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      !chainFilter
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {chains.map((chain) => (
                    <button
                      key={chain}
                      onClick={() => setChainFilter(chain)}
                      className={`px-2.5 py-1.5 rounded-md text-xs ${
                        chainFilter === chain
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border text-foreground"
                      }`}
                    >
                      {chain}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Stage</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStageFilter("")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      !stageFilter
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    All
                  </button>
                  {stages.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-2.5 py-1.5 rounded-md text-xs ${
                        stageFilter === stage
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border text-foreground"
                      }`}
                    >
                      {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Cost</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCostFilter("")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      !costFilter
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setCostFilter("FREE")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      costFilter === "FREE"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    FREE
                  </button>
                  <button
                    onClick={() => setCostFilter("PAID")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      costFilter === "PAID"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    PAID
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">New Projects</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewFilter("")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      !newFilter
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setNewFilter("true")}
                    className={`px-2.5 py-1.5 rounded-md text-xs ${
                      newFilter === "true"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border text-foreground"
                    }`}
                  >
                    New Only
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredAirdrops.length}</span> projects
          {activeFilterCount > 0 && " with filters applied"}
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 sm:gap-4">
        {filteredAirdrops.map((airdrop) => (
          <Link href={`/${airdrop.id}`} key={airdrop.id} className="block">
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors h-full shadow-card hover-card">
              <div className="p-3 sm:p-4">
                {/* Project header with improved mobile layout */}
                <div className="flex items-start gap-3 mb-3.5">
                  {/* Enhanced project image */}
                  <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center flex-shrink-0 border border-border/30 shadow-sm">
                    {airdrop.image_url ? (
                      <Image
                        src={airdrop.image_url || "/placeholder.svg?height=48&width=48"}
                        alt={airdrop.name || "Project"}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-base font-bold text-primary/80">{(airdrop.name || "A").charAt(0)}</span>
                    )}
                  </div>

                  {/* Project title and subtitle with improved typography */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-base truncate max-w-[180px]">
                        {airdrop.name || "Unnamed Project"}
                      </h3>
                      {isNewProject(airdrop.created_at) && (
                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 text-[10px] font-semibold rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-full mt-0.5">
                      {airdrop.subtitle || "No description"}
                    </p>
                  </div>
                </div>

                {/* Improved badges layout */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {airdrop.chain && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100/80 text-gray-800 dark:bg-gray-800/80 dark:text-gray-300 border border-gray-200/30 dark:border-gray-700/30">
                      {airdrop.chain}
                    </span>
                  )}

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      airdrop.cost === 0
                        ? "bg-green-100/80 text-green-800 dark:bg-green-900/60 dark:text-green-300 border border-green-200/30 dark:border-green-800/30"
                        : "bg-orange-100/80 text-orange-800 dark:bg-orange-900/60 dark:text-orange-300 border border-orange-200/30 dark:border-orange-800/30"
                    }`}
                  >
                    {airdrop.cost === 0 ? "FREE" : `$${airdrop.cost}`}
                  </span>

                  {airdrop.stage && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        airdrop.stage.toLowerCase() === "active"
                          ? "bg-green-100/80 text-green-800 dark:bg-green-900/60 dark:text-green-300 border border-green-200/30 dark:border-green-800/30"
                          : airdrop.stage.toLowerCase() === "upcoming"
                            ? "bg-blue-100/80 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 border border-blue-200/30 dark:border-blue-800/30"
                            : airdrop.stage.toLowerCase() === "ended"
                              ? "bg-red-100/80 text-red-800 dark:bg-red-900/60 dark:text-red-300 border border-red-200/30 dark:border-red-800/30"
                              : "bg-gray-100/80 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300 border border-gray-200/30 dark:border-gray-700/30"
                      }`}
                    >
                      {airdrop.stage}
                    </span>
                  )}
                </div>

                {/* Enhanced footer with divider and improved layout */}
                <div className="pt-2 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-primary/70" />
                    <span className="truncate max-w-[120px]">
                      {Array.isArray(airdrop.backers) && airdrop.backers.length > 0
                        ? airdrop.backers.join(", ")
                        : "No backers"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary">
                    <span>View details</span>
                    <ExternalLink size={12} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <div className="overflow-hidden border border-border rounded-lg shadow-card">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary/70">
                <tr className="text-left text-xs sm:text-sm text-muted-foreground">
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium">
                    Project
                  </th>
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium hidden md:table-cell">
                    About
                  </th>
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium">
                    Chain
                  </th>
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium">
                    Cost
                  </th>
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium hidden lg:table-cell">
                    Backers
                  </th>
                  <th scope="col" className="px-3 sm:px-4 py-3 font-medium">
                    Stage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {filteredAirdrops.map((airdrop) => (
                  <tr
                    key={airdrop.id}
                    className="hover:bg-secondary/30 transition-colors cursor-pointer"
                    onClick={() => router.push(`/${airdrop.id}`)}
                  >
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex items-center justify-center flex-shrink-0">
                          {airdrop.image_url ? (
                            <Image
                              src={airdrop.image_url || "/placeholder.svg?height=32&width=32"}
                              alt={airdrop.name || "Project"}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold">{(airdrop.name || "A").charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground text-sm sm:text-base truncate max-w-[120px] sm:max-w-[180px]">
                            {airdrop.name || "Unnamed Project"}
                          </span>
                          {isNewProject(airdrop.created_at) && (
                            <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/60 text-green-800 dark:text-green-300 text-[10px] font-semibold rounded">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-muted-foreground hidden md:table-cell">
                      <div className="truncate max-w-[200px] lg:max-w-[300px]">
                        {airdrop.subtitle || "No description"}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      {airdrop.chain && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium inline-block bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          {airdrop.chain}
                        </span>
                      )}
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          airdrop.cost === 0
                            ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/70 dark:text-orange-300"
                        }`}
                      >
                        {airdrop.cost === 0 ? "FREE" : `$${airdrop.cost}`}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 text-sm text-muted-foreground hidden lg:table-cell">
                      <div className="truncate max-w-[150px]">
                        {Array.isArray(airdrop.backers) ? airdrop.backers.join(", ") : ""}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                      {airdrop.stage && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                            airdrop.stage.toLowerCase() === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
                              : airdrop.stage.toLowerCase() === "upcoming"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300"
                                : airdrop.stage.toLowerCase() === "ended"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800/70 dark:text-gray-300"
                          }`}
                        >
                          {airdrop.stage}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredAirdrops.length === 0 && (
        <div className="text-center py-8 sm:py-10 bg-card border border-border rounded-lg shadow-card">
          <div className="flex flex-col items-center p-4 sm:p-6">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Filter size={20} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No matching projects</h3>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              We couldn't find any projects matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

