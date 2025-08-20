"use client"

import type React from "react"
import Link from "next/link"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"
import { Analytics } from "@vercel/analytics/next"
import { NetworkStatusProvider } from "@/context/network-status-context"
import ThemeToggle from "@/components/ui/theme-toggle"
import NetworkStatusIndicator from "@/components/ui/network-status-indicator"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="google-adsense-account" content="ca-pub-6639387700552171" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      
        {/* Add inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  // Default to dark mode if no stored preference or system preference
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // Default to dark for all other cases
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  console.error('Theme initialization failed:', e);
                  // Default to dark mode on error
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NetworkStatusProvider>
            <header className="border-b border-border/40 bg-gradient-to-r from-background via-secondary/20 to-background backdrop-blur-sm py-3 sm:py-4 px-4 md:px-8 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 p-1.5 sm:p-2 flex items-center justify-center relative overflow-hidden shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
                    <span className="text-white font-bold text-sm sm:text-sm relative z-10">N</span>
                    <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg sm:text-lg text-foreground transition-colors">NoteDrop</span>
                    <span className="text-[10px] text-muted-foreground block sm:block">Web3 Airdrop Tracker</span>
                  </div>
                </Link>

                <div className="flex items-center gap-3">
                  <NetworkStatusIndicator />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <div className="min-h-[calc(100vh-140px)]">{children}</div>

            <footer className="border-t border-border/30 py-6 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 mt-6 sm:mt-8 bg-background/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-5 text-sm text-muted-foreground">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-5 sm:gap-6">
                  <span className="text-center sm:text-left">NoteDrop © {new Date().getFullYear()}</span>

                  <div className="flex flex-wrap justify-center gap-5 sm:gap-4">
                    <Link href="/about" className="hover:text-foreground transition-colors px-2 py-1">
                      About
                    </Link>
                    <Link href="/faq" className="hover:text-foreground transition-colors px-2 py-1">
                      FAQ
                    </Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors px-2 py-1">
                      Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors px-2 py-1">
                      Terms
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-md">
                    <span className="font-medium">Donations:</span>
                    <a
                      href="https://etherscan.io/address/0x17f016c583061e260435ec7AC8302B67c04b4Cde"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      0x17f0...4Cde
                    </a>
                    <span className="text-red-500">❤️</span>
                  </div>
                </div>
              </div>
            </footer>
            <Analytics />
          </NetworkStatusProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

