'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ModeToggle } from '@/components/ui/theme-toggle'
import { Logo } from './Logo'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  return (
    <nav className="sticky top-0 z-50 bg-background border-b font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center">
          {/* Logo (lado esquerdo) */}
          <div className="flex items-center gap-2">
            <Logo />
            <div className="flex flex-col font-bold  leading-tigh tracking-widest">
              <span>GILGĀMEŠ</span>
              <span>livraria</span>
            </div>
          </div>

          {/* Menu central (desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
            <NavigationMenu viewport={false} className="cursor-pointer">
              <NavigationMenuList>
                {/* Livros */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Livros</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex-nowrap">
                    <NavigationMenuLink href="/livros/prosa">
                      Prosa
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/livros/poesia">
                      Poesia
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/livros/outros">
                      Outros
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/livros">
                      Todos
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Autores */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Autores</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="/autores/nacionais">
                      Nacionais
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/autores/internacionais">
                      Internacionais
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/autores">
                      Todos
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Sobre */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sobre</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink href="/sobre">
                      Sobre nós
                    </NavigationMenuLink>
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

          {/* Ações direita (desktop) */}
          <div className="ml-auto hidden md:flex items-center gap-4">
            <ModeToggle />
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => router.push('/registo')}
            >
              Registo
            </Button>
          </div>

          {/* Menu mobile */}
          <Sheet>
            <div className="items-end flex ml-auto md:hidden">
              <ModeToggle />
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden ml-auto"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="right" className="w-64 p-6">
              <div className="flex flex-col space-y-4">
                {/* Mobile Nav */}
                <div className="flex flex-col space-y-2 text-lg">
                  <Link className="cursor-pointer" href="/livros/prosa">
                    Prosa
                  </Link>
                  <Link className="cursor-pointer" href="/livros/poesia">
                    Poesia
                  </Link>
                  <Link className="cursor-pointer" href="/livros/academicos">
                    Académicos
                  </Link>
                  <Link className="cursor-pointer" href="/livros">
                    Ver todos os livros
                  </Link>

                  <Link className="cursor-pointer" href="/autores/nacionais">
                    Autores Nacionais
                  </Link>
                  <Link
                    className="cursor-pointer"
                    href="/autores/internacionais"
                  >
                    Autores Internacionais
                  </Link>
                  <Link className="cursor-pointer" href="/autores/destaques">
                    Destaques
                  </Link>

                  <Link className="cursor-pointer" href="/sobre-nos">
                    Sobre nós
                  </Link>
                  <Link className="cursor-pointer" href="/contacto">
                    Contacto
                  </Link>
                  <Link className="cursor-pointer" href="/condicoes-venda">
                    Condições de venda
                  </Link>
                </div>

                {/* Actions mobile */}
                <div className="flex justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button className="cursor-pointer" variant="outline">
                      Login
                    </Button>
                    <Button className="cursor-pointer">Registar</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
