'use client'

import { useSession, signOut } from '@/lib/auth-client'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, User, UserPlus } from 'lucide-react'

export function HamburgerMenu() {
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-6">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu móvel</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-4 text-lg">
          {/* Navegação */}
          <Link href="/livros/prosa">Prosa</Link>
          <Link href="/livros/poesia">Poesia</Link>
          <Link href="/livros/outros">Outros</Link>
          <Link href="/livros">Todos</Link>

          <Link href="/autores/nacionais">Autores Nacionais</Link>
          <Link href="/autores/internacionais">Autores Internacionais</Link>
          <Link href="/autores">Todos</Link>

          <Link href="/sobre">Sobre nós</Link>
          <Link href="/sobre/contacto">Contacto</Link>
          <Link href="/sobre/condicoes-venda">Condições de venda</Link>

          {/* Secção de conta */}
          <div className="pt-4 mt-4 border-t flex flex-col space-y-2">
            {session?.user ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/perfil">Perfil</Link>
                <Link href="/" className="text-left" onClick={() => signOut()}>
                  Terminar Sessão
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-2">
                  <User className="h-5 w-5" /> Login
                </Link>
                <Link href="/registo" className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" /> Registo
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
