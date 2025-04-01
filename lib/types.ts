export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface AirdropCollection {
  id: string
  created_at: string
  updated_at: string | null
  name: string
  subtitle: string
  image_url: string | null
  image_cover: string | null
  description: string | null
  backers: string[]
  chain: string
  cost: number | null
  stage: "active" | "upcoming" | "ended"
  requirements: Json
  how_to_steps: Json
  user_id: string
}

