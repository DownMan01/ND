import { supabase, isSupabaseConfigured } from "./supabase"
import { withRetryAndCache } from "./api-utils"
import type { AirdropCollection } from "./types"

// Read all rows
export async function getAllAirdropCollections(): Promise<AirdropCollection[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase configuration is missing. Please check your environment variables.")
  }

  try {
    return await withRetryAndCache("all-airdrops", async () => {
      const { data, error } = await supabase.from("airdrop_collections").select("*")

      if (error) {
        console.error("Error fetching all airdrop collections:", error)
        throw error
      }

      return data || []
    })
  } catch (error) {
    console.error("Error in getAllAirdropCollections:", error)
    throw error
  }
}

// Get a single airdrop collection by ID
export async function getAirdropCollectionById(id: string): Promise<AirdropCollection | null> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase configuration is missing. Please check your environment variables.")
  }

  try {
    return await withRetryAndCache(`airdrop-${id}`, async () => {
      const { data, error } = await supabase.from("airdrop_collections").select("*").eq("id", id).single()

      if (error) {
        console.error("Error fetching airdrop collection by ID:", error)
        throw error
      }

      return data
    })
  } catch (error) {
    console.error("Error in getAirdropCollectionById:", error)
    throw error
  }
}

// With pagination - UPDATED VERSION
export async function getPaginatedAirdropCollections(
  page = 1,
  pageSize = 10,
): Promise<{ data: AirdropCollection[]; count: number }> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase configuration is missing. Please check your environment variables.")
  }

  try {
    return await withRetryAndCache(`paginated-airdrops-${page}-${pageSize}`, async () => {
      // Calculate the range based on page and pageSize
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // First, try to get just the count to minimize data transfer
      const countResult = await supabase.from("airdrop_collections").select("id", { count: "exact", head: true })

      if (countResult.error) {
        console.error("Error getting count:", countResult.error)
        throw countResult.error
      }

      const count = countResult.count || 0

      // If count is 0, return early
      if (count === 0) {
        return { data: [], count: 0 }
      }

      // Then get the actual data for the current page
      const { data, error } = await supabase.from("airdrop_collections").select("*").range(from, to)

      if (error) {
        console.error("Error fetching paginated data:", error)
        throw error
      }

      return {
        data: data || [],
        count,
      }
    })
  } catch (error) {
    console.error("Error in getPaginatedAirdropCollections:", error)
    throw error
  }
}

// Filter airdrop collections
export async function getFilteredAirdropCollections(
  filters: {
    chain?: string
    stage?: string
    cost?: number
    search?: string
  },
  page = 1,
  pageSize = 10,
): Promise<{ data: AirdropCollection[]; count: number }> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase configuration is missing. Please check your environment variables.")
  }

  try {
    // Create a cache key based on the filters and pagination
    const filterKey = JSON.stringify(filters)
    return await withRetryAndCache(`filtered-airdrops-${filterKey}-${page}-${pageSize}`, async () => {
      // Calculate the range based on page and pageSize
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Build the query
      let query = supabase.from("airdrop_collections").select("*", { count: "exact" })

      // Apply filters
      if (filters.chain) {
        query = query.eq("chain", filters.chain)
      }

      if (filters.stage) {
        query = query.eq("stage", filters.stage)
      }

      if (filters.cost !== undefined) {
        query = query.eq("cost", filters.cost)
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,subtitle.ilike.%${filters.search}%`)
      }

      // First, get just the count with the filters
      const countQuery = supabase.from("airdrop_collections").select("id", { count: "exact", head: true })

      // Apply the same filters to the count query
      if (filters.chain) {
        countQuery.eq("chain", filters.chain)
      }

      if (filters.stage) {
        countQuery.eq("stage", filters.stage)
      }

      if (filters.cost !== undefined) {
        countQuery.eq("cost", filters.cost)
      }

      if (filters.search) {
        countQuery.or(`name.ilike.%${filters.search}%,subtitle.ilike.%${filters.search}%`)
      }

      const countResult = await countQuery

      if (countResult.error) {
        console.error("Error getting filtered count:", countResult.error)
        throw countResult.error
      }

      const count = countResult.count || 0

      // If count is 0, return early
      if (count === 0) {
        return { data: [], count: 0 }
      }

      // Apply pagination to the main query
      query = query.range(from, to)

      // Execute the query
      const { data, error } = await query

      if (error) {
        console.error("Error fetching filtered data:", error)
        throw error
      }

      return {
        data: data || [],
        count,
      }
    })
  } catch (error) {
    console.error("Error in getFilteredAirdropCollections:", error)
    throw error
  }
}

