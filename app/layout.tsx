import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Guransh Singh | Portfolio',
  description: 'Robotics, Embedded Systems, PCB Design & 3D CAD Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="bg-bg text-text min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
