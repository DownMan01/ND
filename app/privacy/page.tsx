import { PageHeader } from "@/components/ui/page-header"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Privacy Policy" description="Last updated: June 1, 2023" />

        <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none px-1 sm:px-0">
          <p>
            At NoteDrop, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">Information We Collect</h2>
          <p>We collect information that you provide directly to us when you:</p>
          <ul className="my-4 pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Create an account</li>
            <li>Fill out a form</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <p>The types of information we may collect include:</p>
          <ul className="my-4 pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Wallet addresses</li>
            <li>Usage data</li>
            <li>Device information</li>
          </ul>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@notedrop.xyz</p>
        </div>
      </div>
    </main>
  )
}

