import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Second Brain',
  description: 'Project Managment for the 21st Century',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="night">
      <body>{children}</body>
    </html>
  )
}
