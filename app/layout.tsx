import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/theme-provider'
import Header from './components/header'
import Footer from './components/footer'
import { Toaster } from "sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Illusionary - AI-Powered Image Generation',
  description: 'Create and share stunning AI-generated images with Illusionary. Unleash your imagination and explore a world of visual creativity.',
  keywords: 'AI, image generation, artificial intelligence, creativity, art',
  openGraph: {
    title: 'Illusionary - AI-Powered Image Generation',
    description: 'Create and share stunning AI-generated images with Illusionary.',
    images: [
      {
        url: 'https://i.ibb.co/PmGKzRB/Screenshot-2024-12-29-030202-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Illusionary Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

