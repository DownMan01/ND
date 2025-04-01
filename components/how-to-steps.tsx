"use client"

import { motion } from "framer-motion"
import { CheckSquare, Info, ArrowRight, Clock, ExternalLink } from "lucide-react"
import { useState } from "react"
import type { Json } from "@/lib/types"

interface HowToStepsProps {
  steps: Json
}

export default function HowToSteps({ steps }: HowToStepsProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null)

  const toggleExpand = (key: string) => {
    if (expandedStep === key) {
      setExpandedStep(null)
    } else {
      setExpandedStep(key)
    }
  }

  // Handle the steps data based on its structure
  const stepsList = Array.isArray(steps) ? steps : []

  if (stepsList.length === 0) {
    return (
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="p-6 border-b border-border bg-card/80">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CheckSquare size={20} className="text-primary" />
            How to Participate
          </h2>
        </div>
        <div className="flex items-center justify-center p-8 bg-card">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Info size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Steps Provided</h3>
            <p className="text-muted-foreground">
              This airdrop doesn't have any specific participation steps. Check the project website for more
              information.
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
          <CheckSquare size={20} className="text-primary" />
          How to Participate
        </h2>
      </div>

      <div className="p-6">
        <div className="relative">
          {/* Timeline connector */}
          {stepsList.length > 1 && <div className="absolute left-4.5 top-10 bottom-10 w-0.5 bg-secondary"></div>}

          <div className="space-y-6">
            {stepsList.map((step: any, index) => {
              const stepId = step.step?.toString() || index.toString()
              const isExpanded = expandedStep === stepId
              const isLast = index === stepsList.length - 1

              return (
                <motion.div
                  key={stepId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center z-10 relative text-primary">
                        <span className="text-sm font-medium">{step.step || index + 1}</span>
                      </div>

                      {!isLast && (
                        <div className="absolute top-9 left-1/2 transform -translate-x-1/2 h-6 w-0.5 bg-secondary" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div
                        onClick={() => toggleExpand(stepId)}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                          isExpanded
                            ? "bg-secondary/70 border-border"
                            : "bg-secondary/30 border-border/50 hover:bg-secondary/50"
                        }`}
                      >
                        <h3 className="font-medium text-foreground mb-1">
                          {step.title || `Step ${step.step || index + 1}`}
                        </h3>

                        {step.estimatedTime && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Clock size={12} />
                            <span>Estimated time: {step.estimatedTime}</span>
                          </div>
                        )}

                        {step.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{step.description}</p>
                        )}

                        {isExpanded && (
                          <div className="mt-3 p-3 bg-background rounded-md text-muted-foreground text-sm border border-border/50">
                            {step.description ? (
                              <p>{step.description}</p>
                            ) : (
                              <p>No additional details provided for this step.</p>
                            )}

                            {step.url && (
                              <div className="mt-3 pt-3 border-t border-border/50">
                                <a
                                  href={step.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  <span>Go to step</span>
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {!isLast && (
                        <div className="flex justify-center my-1 text-muted-foreground/50">
                          <ArrowRight size={14} className="rotate-90" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

