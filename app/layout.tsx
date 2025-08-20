import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NoteDrop - Web3 Airdrop Database",
  description: "Discover and track the latest blockchain projects, airdrops, and protocols.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: ''
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'
