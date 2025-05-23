import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { SessionProvider } from "@/components/SessionProvider"
import { ClientProviders } from "@/components/ClientProviders"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Mystic Time Server",
  description: "Официальный сайт сервера Mystic Time",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ClientProviders>
              <Navbar />
              <main className="container mx-auto px-4 py-8">{children}</main>
            </ClientProviders>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
