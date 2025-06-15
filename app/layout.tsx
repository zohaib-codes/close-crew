import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Close Crew - Your Crew to Close More Deals",
  description: "We turn strategy into scalable growth. Professional marketing and sales optimization services.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans`}>
        {children}
        <script 
          src="https://assets.calendly.com/assets/external/widget.js" 
          async
        ></script>
      </body>
    </html>
  )
}
