// app/books/page.tsx
import BookCard, { Book } from '@/components/BookCard'
import prisma from '@/lib/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type BookWithAuthors = Book & {
  authorNames: string
  categoryNames: string
}

export default async function BooksPage() {
  // Buscar livros, incluindo autores e categorias
  const booksFromDb = await prisma.book.findMany({
    include: {
      authors: true,
      categories: true,
    },
  })

  // Formatar para frontend
  const books: BookWithAuthors[] = booksFromDb.map((book) => ({
    ...book,
    price: Number(book.price),
    authorNames: book.authors.map((a) => a.name).join(', '),
    categoryNames: book.categories.map((c) => c.name).join(', '),
  }))

  booksFromDb.forEach((b) => {
    console.log('Book:', b.title, 'Cover:', b.coverImage)
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Todos os livros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          // Acrescentei justify-evenly para espaçar melhor os elementos
          <Card
            key={book.id}
            className="hover:shadow-lg transition-shadow justify-evenly flex"
          >
            <CardHeader>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">
                {book.authorNames}
              </p>
            </CardHeader>
            <CardContent>
              {book.coverImage && (
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  className="w-auto h-auto object-contain rounded-md mb-2"
                  width={500}
                  height={500}
                />
              )}
              <p className="text-sm line-clamp-3">{book.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="font-bold">${book.price.toFixed(2)}</span>
              <Button size="sm" variant="secondary">
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
