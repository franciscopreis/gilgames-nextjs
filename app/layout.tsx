import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/Footer'

// Fonte para títulos / branding
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'], // regular e bold
})

// Fonte para corpo de texto / conteúdo
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Livraria GILGĀMEŠ',
  description: 'Livros usados para todos os gostos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme-preference"
        >
          <Navbar />
          <main className="font-inter">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
