'use client'

import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="AI-Powered Crypto Portfolio Advisor" />
        <title>Crypto Portfolio Advisor</title>
      </head>
      <body className="bg-dark-900 text-gray-100">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
