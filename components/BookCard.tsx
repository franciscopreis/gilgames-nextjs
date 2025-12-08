// components/BookCard.tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface Book {
  id: string
  title: string
  description: string | null
  price: number
  stock: number
  coverImage: string | null
  createdAt: Date
  updatedAt: Date
}

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card className="max-w-sm">
      <CardHeader className="text-lg font-semibold">{book.title}</CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {book.description ?? 'Sem descrição'}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-medium">${book.price.toFixed(2)}</span>
        <Button variant="default">Comprar</Button>
      </CardFooter>
    </Card>
  )
}
