// app/api/books/route.ts
import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { successResponse, errorResponse } from '@/lib/utils/responses'

export async function GET(req: NextRequest) {
  try {
    const books = await prisma.book.findMany()
    return successResponse(books)
  } catch (err) {
    return errorResponse(err, 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newBook = await prisma.book.create({ data: body })
    return successResponse(newBook, 201)
  } catch (err) {
    return errorResponse(err, 500)
  }
}
