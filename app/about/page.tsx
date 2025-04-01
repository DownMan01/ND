import { PageHeader } from "@/components/ui/page-header"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="About NoteDrop"
          description="Your trusted source for Web3 airdrops and blockchain projects"
        />

        <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none px-1 sm:px-0">
          <p>
            NoteDrop is a comprehensive platform designed to help users discover, track, and participate in legitimate
            Web3 airdrops across multiple blockchains.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">Our Mission</h2>
          <p>
            Our mission is to simplify the process of finding and participating in quality airdrops, helping users
            navigate the complex world of Web3 with confidence and security.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">What We Offer</h2>
          <ul className="my-4 pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Curated listings of verified airdrops across multiple blockchains</li>
            <li>Detailed requirements and step-by-step guides for participation</li>
            <li>Real-time updates on new and trending projects</li>
            <li>Educational resources about blockchain technology and airdrops</li>
            <li>Community-driven insights and reviews</li>
          </ul>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">Our Values</h2>
          <p>
            At NoteDrop, we believe in transparency, security, and accessibility. We carefully verify all projects
            before listing them and provide clear information to help users make informed decisions.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!
            <br />
            Email: contact@notedrop.xyz
          </p>
        </div>
      </div>
    </main>
  )
}

