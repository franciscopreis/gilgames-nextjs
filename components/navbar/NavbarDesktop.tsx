'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/custom/navigation-menu'

import { ModeToggle } from '@/components/ui/theme-toggle'
import { Logo } from '../Logo'
import { Button } from '@/components/ui/button'

import UserMenuDesktop from './UserMenuDesktop'
import CartIcon from '../CartIcon'

export default function NavbarDesktop() {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className="flex items-center h-16 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-10">
        <Logo />
        <div className="flex flex-col font-bold leading-tight tracking-widest">
          <span>livraria</span>
          <span>GILGĀMEŠ</span>
        </div>
      </div>

      {/* Center menu */}
      <div className="flex-grow flex justify-center">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Livros</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/livros/prosa">
                  Prosa
                </NavigationMenuLink>
                <NavigationMenuLink href="/livros/poesia">
                  Poesia
                </NavigationMenuLink>
                <NavigationMenuLink href="/livros/outros">
                  Outros
                </NavigationMenuLink>
                <NavigationMenuLink href="/livros">Todos</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Autores</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/autores/nacionais">
                  Nacionais
                </NavigationMenuLink>
                <NavigationMenuLink href="/autores/internacionais">
                  Internacionais
                </NavigationMenuLink>
                <NavigationMenuLink href="/autores">Todos</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Sobre</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/sobre">Sobre nós</NavigationMenuLink>
                <NavigationMenuLink href="/sobre/contacto">
                  Contacto
                </NavigationMenuLink>
                <NavigationMenuLink href="/sobre/condicoes-venda">
                  Condições de venda
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />
        <CartIcon />

        {/* Logged user */}
        {session?.user ? (
          <UserMenuDesktop user={session.user} />
        ) : (
          <>
            <Button variant="outline" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button onClick={() => router.push('/registo')}>Registo</Button>
          </>
        )}
      </div>
    </div>
  )
}
