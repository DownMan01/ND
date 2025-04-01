// Cache for storing API responses
const apiCache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 60000 // Cache time-to-live in milliseconds (1 minute)

// Maximum number of retries
const MAX_RETRIES = 3

// Initial delay for exponential backoff (in milliseconds)
const INITIAL_RETRY_DELAY = 1000

/**
 * Executes a function with retry logic and caching
 * @param cacheKey - Key for caching the result
 * @param fn - Async function to execute
 * @param options - Options for retries and caching
 */
export async function withRetryAndCache<T>(
  cacheKey: string,
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    cacheTtl?: number
    skipCache?: boolean
  } = {},
): Promise<T> {
  const { maxRetries = MAX_RETRIES, cacheTtl = CACHE_TTL, skipCache = false } = options

  // Check cache first (if not skipping cache)
  if (!skipCache) {
    const cached = apiCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < cacheTtl) {
      console.log(`[Cache] Using cached data for ${cacheKey}`)
      return cached.data
    }
  }

  // Implement retry logic with exponential backoff
  let lastError: any
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Execute the function
      const result = await fn()

      // Cache the successful result
      if (!skipCache) {
        apiCache.set(cacheKey, { data: result, timestamp: Date.now() })
      }

      return result
    } catch (error: any) {
      lastError = error

      // Check if it's a rate limit error
      const isRateLimit = error?.message?.includes("Too Many Requests") || error?.status === 429

      // If it's the last attempt or not a rate limit error, don't retry
      if (attempt === maxRetries || !isRateLimit) {
        break
      }

      // Calculate delay with exponential backoff
      const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt)
      console.log(`[Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms...`)

      // Wait before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  // If we get here, all retries failed
  console.error(`[Error] All retries failed for ${cacheKey}:`, lastError)
  throw lastError
}

/**
 * Clears the API cache
 * @param key - Optional specific cache key to clear
 */
export function clearApiCache(key?: string): void {
  if (key) {
    apiCache.delete(key)
  } else {
    apiCache.clear()
  }
}

