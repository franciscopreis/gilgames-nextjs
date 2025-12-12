// app/books/page.tsx
import BookCard, { Book } from '@/components/BookCard'
import prisma from '@/lib/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { redirect } from 'next/navigation'

type BookWithAuthors = Book & {
  authorNames: string
  categoryNames: string
}

export default async function BooksPage() {
  return redirect('/livros/todos')
}
