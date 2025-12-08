'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Icons } from './Icons'

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1. Sobre a Livraria */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sobre Nós</h3>
          <p className="text-sm">
            Aqui poderás encontrar livros em segunda mão para todos os gostos.
          </p>
          <p className="text-sm">
            © 2025 GILGAMES livraria. Todos os direitos reservados.
          </p>
        </div>

        {/* 2. Links Rápidos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Navegação</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link href="/loja" className="hover:underline">
                Loja
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/contactos" className="hover:underline">
                Contactos
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Newsletter / Redes Sociais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <p className="text-sm">
            Subscreve para receber em primeira mão os livros que publicámos.
          </p>
          <form className="flex gap-2">
            <Input type="email" placeholder="O teu email" className="flex-1" />
            <Button type="submit">Subscrever</Button>
          </form>
          <div className="flex space-x-4 mt-4">
            {/* <Link href="#" aria-label="Facebook" className="hover:text-primary">
              <Icons.facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <Icons.instagram className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-primary">
              <Icons.twitter className="w-5 h-5" />
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
