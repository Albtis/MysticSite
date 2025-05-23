"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/shop', label: 'Магазин' },
  { href: '/support', label: 'Поддержка' },
  { href: '/profile', label: 'Личный кабинет' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">Mystic Time</Link>
          </div>
          <div className="flex items-center">
            {navItems.map((item) => (
              (item.href !== '/profile' || session) && (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium mr-2",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
            {session ? (
              <Button onClick={() => signOut()} variant="outline">Выйти</Button>
            ) : (
              <Button onClick={() => signIn()}>Войти</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
