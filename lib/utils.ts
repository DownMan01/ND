import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely converts a value to a string.
 */
export function safeToString(value: any): string {
  try {
    if (value === null || value === undefined) {
      return ""
    }
    return value.toString()
  } catch (error) {
    console.error("Error converting value to string:", error)
    return ""
  }
}

