import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Marcus Xavier',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={``}>{children}</body>
    </html>
  )
}
