// app/books/page.tsx
import BookCard, { Book } from '@/components/BookCard'
import { prisma } from '@/lib/db'

export default async function BooksPage() {
  // Busca todos os livros
  const booksFromDb = await prisma.book.findMany()

  // Converte Decimal → number
  const books: Book[] = booksFromDb.map((book) => ({
    ...book,
    price: Number(book.price),
  }))

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
