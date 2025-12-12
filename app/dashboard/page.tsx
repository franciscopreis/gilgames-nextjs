'use client'

import { useRouter } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth-client'
import { useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Book, Heart, Settings, ClipboardList, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()

  // Check user session
  const { data: session, isPending } = useSession()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login')
    }
  }, [isPending, session, router])

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 p-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  // If no user, show redirecting message
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redireccionando...</p>

  // User is authenticated, render dashboard
  const { user } = session // Extract user info
  const initials = user.name // Generate initials for avatar fallback
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  // Mock data for recent purchases
  const recentPurchases = [
    { title: 'O Hobbit', date: '2025-12-01', status: 'Entregue' },
    { title: '1984', date: '2025-11-28', status: 'Enviado' },
    { title: 'O Senhor dos Anéis', date: '2025-11-20', status: 'Entregue' },
  ]

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col space-y-6 bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {/* texto usa foreground */}Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {/* <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ''} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar> */}
          <Button
            variant="secondary"
            className="text-xs border-[var(--border)] text-[var(--foreground)]"
            onClick={() => signOut()}
          >
            <LogOut className="md:hidden inline" />
            <span className="hidden md:inline">Terminar sessão</span>
          </Button>
        </div>
      </header>

      <Separator className="border-[var(--border)]" />

      {/* Profile Card */}
      <Card className="bg-[var(--card)] text-[var(--card-foreground)]">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <p>
            <span className="font-medium">Nome:</span> {user.name || 'User'}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <Button
            variant="outline"
            className="w-32 mt-2 border-border text-foreground"
          >
            Editar perfil
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: 'Pedidos' },
          { icon: Book, label: 'Compras' },
          { icon: Heart, label: 'Favoritos' },
          { icon: Settings, label: 'Definições' },
        ].map((item, idx) => {
          const Icon = item.icon
          return (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center p-4 cursor-pointer transition hover:bg-muted"
            >
              <Icon className="h-6 w-6 text-foreground" />
              <span>{item.label}</span>
            </Card>
          )
        })}
      </div>

      {/* Recent Purchases */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Compras Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-[var(--foreground)]">
            <TableHeader>
              <TableRow>
                <TableHead>Livro</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPurchases.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === 'Delivered' ? 'outline' : 'secondary'
                      }
                      className="border-[var(--border)] text-[var(--foreground)]"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
