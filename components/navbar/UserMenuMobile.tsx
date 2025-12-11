'use client'

import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User, UserPlus, Menu } from 'lucide-react'
import { ModeToggle } from '@/components/ui/theme-toggle'

export default function UserMenuMobile() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const initials = session?.user?.name
    ? session.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'U'

  return (
    <div className="flex items-center gap-2">
      {/* Autenticação */}
      {isPending ? null : session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image || ''} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/perfil')}>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Terminar Sessão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button variant="ghost" onClick={() => router.push('/login')}>
            <User className="h-5 w-5" />
          </Button>

          <Button variant="ghost" onClick={() => router.push('/registo')}>
            <UserPlus className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-64 p-6">
          {/* REQUISITO DO RADIX — acessível e invisível */}
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

                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                    className="flex items-center text-left"
                  >
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
    </div>
  )
}
