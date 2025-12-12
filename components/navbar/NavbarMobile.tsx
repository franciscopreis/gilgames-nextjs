'use client'

import { useSession } from '@/lib/auth-client'
import { Logo } from '../Logo'
import { ModeToggle } from '@/components/ui/theme-toggle'
import UserMenuMobile from './UserMenuMobile'
import CartIcon from '../CartIcon'
import { Button } from '@/components/ui/button'
import { HamburgerMenu } from './HamburgerMenu'

export default function NavbarMobile() {
  const { data: session, isPending } = useSession()

  return (
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-2 mr-10">
        <Logo />
        <div className="flex flex-col font-bold leading-tight tracking-widest">
          <span>livraria</span>
          <span>GILGĀMEŠ</span>
        </div>
      </div>

      <div className="flex gap-0 items-center">
        <ModeToggle />
        <CartIcon />
        {isPending ? (
          <div className="w-8 h-8 bg-accent animate-pulse rounded-full" />
        ) : (
          <UserMenuMobile />
        )}
        <HamburgerMenu />
      </div>
    </div>
  )
}
