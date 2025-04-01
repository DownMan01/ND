"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type FaqItem = {
  question: string
  answer: string
}

const faqData: FaqItem[] = [
  {
    question: "What is a crypto airdrop?",
    answer:
      "A crypto airdrop is a distribution of tokens or coins sent directly to wallet addresses, usually for free. Projects use airdrops to increase awareness, reward users, or distribute governance rights.",
  },
  {
    question: "How do I participate in an airdrop?",
    answer:
      "To participate, you typically need to complete specific tasks like using a protocol, connecting your wallet, or engaging with a project's community. Each airdrop has its own requirements and steps.",
  },
  {
    question: "Are airdrops really free?",
    answer:
      "Most airdrops are free to claim, but you'll need to pay network transaction fees (gas) to receive them. Some airdrops may require prior investment or participation in a protocol.",
  },
  {
    question: "How do I stay safe when claiming airdrops?",
    answer:
      "Always research projects before connecting your wallet, be wary of projects asking for private keys or seed phrases, and consider using a separate wallet for airdrop hunting to minimize risks.",
  },
  {
    question: "What chains support airdrops?",
    answer:
      "Airdrops happen across many blockchains including Ethereum, Solana, BNB Chain, and others. Each chain has its own ecosystem of projects that may distribute tokens through airdrops.",
  },
  {
    question: "How does NoteDrop help with airdrops?",
    answer:
      "NoteDrop tracks and verifies legitimate airdrops, provides detailed requirements and steps to participate, and helps you discover new opportunities across multiple blockchains.",
  },
]

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          className="border border-border rounded-lg overflow-hidden bg-card shadow-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex items-center justify-between w-full p-3 sm:p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 hover:bg-secondary/30 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-base sm:text-lg font-medium text-foreground pr-4">{item.question}</h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-primary flex-shrink-0"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
                aria-hidden={openIndex !== index}
              >
                <div className="px-3 sm:px-4 py-4 sm:py-5 border-t border-border bg-secondary/20">
                  <motion.p
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.answer}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

