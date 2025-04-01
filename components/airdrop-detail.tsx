"use client"

import type { AirdropCollection } from "@/lib/types"
import Image from "next/image"
import { ArrowLeft, Calendar, Users, ExternalLink, Globe, Twitter, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import RequirementsCard from "./requirements-card"
import HowToSteps from "./how-to-steps"
import Link from "next/link"

interface AirdropDetailProps {
  airdrop: AirdropCollection
}

export default function AirdropDetail({ airdrop }: AirdropDetailProps) {
  const router = useRouter()

  const createdDate = new Date(airdrop.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format stage for display
  const formatStage = (stage: string) => {
    return stage.charAt(0).toUpperCase() + stage.slice(1)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group mb-6"
      >
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10">
          <ArrowLeft size={16} className="group-hover:text-primary" />
        </div>
        <span>Back to all airdrops</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl border border-border overflow-hidden mb-8"
          >
            {/* Image section with improved visibility */}
            <div className="relative h-56 md:h-72 w-full bg-secondary">
              {airdrop.image_url ? (
                <Image
                  src={airdrop.image_url || "/placeholder.svg?height=400&width=800"}
                  alt={airdrop.name}
                  fill
                  className="object-contain object-center"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/20">{airdrop.name.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Title and badges */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      airdrop.chain === "Ethereum/EVM"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300"
                        : airdrop.chain === "Solana"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
                          : airdrop.chain === "BNB"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-300"
                            : airdrop.chain === "Multichain"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300"
                              : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {airdrop.chain}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      airdrop.stage === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
                        : airdrop.stage === "upcoming"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800/70 dark:text-gray-300"
                    }`}
                  >
                    {formatStage(airdrop.stage)}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      airdrop.cost === 0 || airdrop.cost === null
                        ? "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-300"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/70 dark:text-orange-300"
                    }`}
                  >
                    {airdrop.cost === 0 || airdrop.cost === null ? "FREE" : `$${airdrop.cost}`}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{airdrop.name}</h1>
                <p className="text-lg text-muted-foreground">{airdrop.subtitle}</p>
              </div>

              {/* Project info */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} className="text-primary" />
                  <span>Created: {createdDate}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={16} className="text-primary" />
                  <span>Backers: {airdrop.backers.join(", ")}</span>
                </div>
              </div>

              {/* Description */}
              {airdrop.description && (
                <div className="bg-secondary/50 rounded-lg p-5 mb-6">
                  <h2 className="text-lg font-medium text-foreground mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{airdrop.description}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-3 bg-primary rounded-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <ExternalLink size={18} />
                  Participate in Airdrop
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-3 bg-secondary rounded-lg font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Globe size={18} />
                  Visit Website
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-3 bg-secondary rounded-lg font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Twitter size={18} />
                  Twitter
                </a>
              </div>
            </div>
          </motion.div>

          {/* Requirements and How to Participate */}
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <RequirementsCard requirements={airdrop.requirements} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HowToSteps steps={airdrop.how_to_steps} />
            </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6 sticky top-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award size={18} className="text-primary" />
              Backers
            </h2>

            <div className="space-y-3">
              {airdrop.backers.length > 0 ? (
                airdrop.backers.map((backer, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-medium">{backer.charAt(0)}</span>
                    </div>
                    <span className="text-foreground">{backer}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-secondary/50 rounded-lg text-center">
                  <p className="text-muted-foreground">No backers listed</p>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-foreground mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span>Browse All Airdrops</span>
                </Link>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span>Documentation</span>
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span>Help Center</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

