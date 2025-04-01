"use client"

import { motion } from "framer-motion"
import { CheckCircle, ChevronDown, Info, ExternalLink } from "lucide-react"
import { useState } from "react"
import type { Json } from "@/lib/types"

interface RequirementsCardProps {
  requirements: Json
}

export default function RequirementsCard({ requirements }: RequirementsCardProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }

  // Handle the requirements data based on its structure
  const requirementsList = Array.isArray(requirements) ? requirements : []

  if (requirementsList.length === 0) {
    return (
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="p-6 border-b border-border bg-card/80">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle size={20} className="text-primary" />
            Requirements
          </h2>
        </div>
        <div className="flex items-center justify-center p-8 bg-card">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Info size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Requirements</h3>
            <p className="text-muted-foreground">
              This airdrop doesn't have any specific requirements. Everyone is eligible to participate.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <div className="p-6 border-b border-border bg-card/80">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <CheckCircle size={20} className="text-primary" />
          Requirements
        </h2>
      </div>

      <div className="divide-y divide-border">
        {requirementsList.map((req: any, index) => (
          <motion.div
            key={req.id || index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => toggleItem(req.id || index.toString())}
              className="w-full text-left p-5 flex items-center justify-between hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="text-sm font-medium">{req.id || index + 1}</span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{req.title || "Requirement"}</h3>
                  {req.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {typeof req.description === "string" && req.description.length < 60
                        ? req.description
                        : "Click to view details"}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                  expandedItem === (req.id || index.toString()) ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {expandedItem === (req.id || index.toString()) && (
              <div className="px-5 pb-5">
                <div className="ml-13 p-4 bg-secondary/50 rounded-lg text-muted-foreground text-sm border border-border/50">
                  {req.description ? (
                    <p>{req.description}</p>
                  ) : (
                    <p>No additional details provided for this requirement.</p>
                  )}

                  {req.url && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <a
                        href={req.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Learn more</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

