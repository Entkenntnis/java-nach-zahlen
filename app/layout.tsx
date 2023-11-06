import { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
import './faicon.css'

export const metadata: Metadata = {
  title: 'Java nach Zahlen',
  description: 'Lerne Java programmieren entspannt und übersichtlich',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}
