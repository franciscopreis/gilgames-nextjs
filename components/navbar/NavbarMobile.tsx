'use client'

import { Logo } from '../Logo'
import { ModeToggle } from '@/components/ui/theme-toggle'
import UserMenuMobile from './UserMenuMobile'
import CartIcon from '../CartIcon'

export default function NavbarMobile() {
  return (
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-2 mr-10">
        <Logo />
        <div className="flex flex-col font-bold leading-tight tracking-widest">
          <span>livraria</span>
          <span>GILGĀMEŠ</span>
        </div>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <CartIcon />
        <UserMenuMobile />
      </div>
    </div>
  )
}
