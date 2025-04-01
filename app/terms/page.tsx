import { PageHeader } from "@/components/ui/page-header"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 px-3 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader title="Terms of Service" description="Last updated: June 1, 2023" />

        <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none px-1 sm:px-0">
          <p>Please read these Terms of Service ("Terms") carefully before using the NoteDrop website and services.</p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these
            Terms, you may not access or use our services.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">2. Description of Service</h2>
          <p>
            NoteDrop provides a platform for discovering and tracking Web3 airdrops and blockchain projects. Our
            services include but are not limited to:
          </p>
          <ul className="my-4 pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Airdrop listings and information</li>
            <li>Project tracking</li>
            <li>Notification services</li>
            <li>Educational content</li>
          </ul>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">3. User Accounts</h2>
          <p>
            To access certain features of our services, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account credentials and for all activities that occur under your
            account.
          </p>
          <p>
            You agree to provide accurate and complete information when creating your account and to update your
            information to keep it accurate and current.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="my-4 pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Use our services for any illegal purpose</li>
            <li>Violate any laws or regulations</li>
            <li>Impersonate any person or entity</li>
            <li>Interfere with or disrupt our services</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Collect or store personal data about other users without their consent</li>
            <li>Use our services to send spam or other unsolicited messages</li>
          </ul>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">5. Intellectual Property</h2>
          <p>
            Our services and all content and materials included on our services, such as text, graphics, logos, images,
            and software, are the property of NoteDrop or its licensors and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
            republish, download, store, or transmit any of the material on our services without our prior written
            consent.
          </p>

          <h2 className="text-xl sm:text-2xl mt-6 mb-3">13. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: contact@notedrop.xyz</p>
        </div>
      </div>
    </main>
  )
}

