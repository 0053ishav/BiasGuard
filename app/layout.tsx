import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { ToastProvider } from "@/components/toast-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BiasGuard AI - Behavioral Bias Detection",
  description: "Advanced bias detection engine for Indian retail stock traders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
