import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://i.imghippo.com/files/YRb1365vU.png"
            alt="Illusionary"
            width={180}
            height={45}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-end">
          <Link href="/generate" className="transition-colors hover:text-foreground/80 text-foreground/60">Generate</Link>
          <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">Gallery</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

