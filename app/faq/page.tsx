import { PageHeader } from "@/components/ui/page-header"
import FaqAccordion from "@/components/faq-accordion"

export default function FaqPage() {
  return (
    <main className="min-h-screen pt-10 pb-16 px-3 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto pt-2 sm:pt-4">
        <PageHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about Web3 airdrops and how to participate in them."
        />

        <div className="mt-6">
          <FaqAccordion />
        </div>
      </div>
    </main>
  )
}

