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
import { Book, Heart, Settings, ClipboardList } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login')
    }
  }, [isPending, session, router])

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 p-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redireccionando...</p>

  const { user } = session
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  // Mock data for recent purchases
  const recentPurchases = [
    { title: 'O Hobbit', date: '2025-12-01', status: 'Delivered' },
    { title: '1984', date: '2025-11-28', status: 'Shipped' },
    { title: 'O Senhor dos Anéis', date: '2025-11-20', status: 'Delivered' },
  ]

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ''} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            className="text-xs"
            onClick={() => signOut()}
          >
            Terminar Sessão
          </Button>
        </div>
      </header>

      <Separator />

      {/* Profile Card */}
      <Card>
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
          <Button variant="outline" className="w-32 mt-2">
            Editar perfil
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-700 transition">
          <ClipboardList className="mb-2 h-6 w-6 text-white" />
          <span>Pedidos</span>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-700 transition">
          <Book className="mb-2 h-6 w-6 text-white" />
          <span>Compras</span>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-700 transition">
          <Heart className="mb-2 h-6 w-6 text-white" />
          <span>Favoritos</span>
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-700 transition">
          <Settings className="mb-2 h-6 w-6 text-white" />
          <span>Definições</span>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Compras Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
