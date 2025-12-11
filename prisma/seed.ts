import prisma from '../lib/db'
import cuid from 'cuid'

async function main() {
  console.log('🌱 Seeding database...')

  // --------
  // CATEGORIES
  // --------
  const categories = [
    'Fiction',
    'Fantasy',
    'Sci-Fi',
    'History',
    'Biography',
    'Classic',
    'Mystery',
    'Romance',
    'Young Adult',
    'Non-fiction',
  ]
  const categoryRecords: Record<string, string> = {}

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    categoryRecords[name] = category.id
  }

  // --------
  // AUTHORS
  // --------
  const authors = [
    'J. R. R. Tolkien',
    'Isaac Asimov',
    'Frank Herbert',
    'George Orwell',
    'Harper Lee',
  ]
  const authorRecords: Record<string, string> = {}

  for (const name of authors) {
    const author = await prisma.author.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    authorRecords[name] = author.id
  }

  // --------
  // BOOKS
  // --------
  const books = [
    {
      title: 'Dune',
      description: 'A science fiction masterpiece.',
      price: 18.99,
      stock: 30,
      authors: ['Frank Herbert'],
      categories: ['Sci-Fi'],
    },
    {
      title: 'The Hobbit',
      description: 'A timeless fantasy adventure.',
      price: 14.99,
      stock: 40,
      authors: ['J. R. R. Tolkien'],
      categories: ['Fantasy'],
    },
    {
      title: '1984',
      description: 'A dystopian classic.',
      price: 12.99,
      stock: 50,
      authors: ['George Orwell'],
      categories: ['Fiction', 'Classic'],
    },
    {
      title: 'To Kill a Mockingbird',
      description: 'A novel about justice and racism in the Deep South.',
      price: 15.99,
      stock: 25,
      authors: ['Harper Lee'],
      categories: ['Fiction', 'Classic'],
    },
  ]
  const bookRecords: Record<string, string> = {}

  for (const b of books) {
    const bookAuthors = b.authors.map((name) => ({ id: authorRecords[name] }))
    const bookCategories = b.categories.map((name) => ({
      id: categoryRecords[name],
    }))

    const book = await prisma.book.upsert({
      where: { title: b.title },
      update: {},
      create: {
        title: b.title,
        description: b.description,
        price: b.price,
        stock: b.stock,
        authors: { connect: bookAuthors },
        categories: { connect: bookCategories },
      },
    })

    bookRecords[b.title] = book.id
  }

  // --------
  // USERS + ACCOUNTS
  // --------
  const users = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      password: 'admin123',
    },
    {
      name: 'Customer User',
      email: 'customer@example.com',
      role: 'CUSTOMER',
      password: 'customer123',
    },
  ]
  const userRecords: Record<string, string> = {}

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        role: u.role as 'ADMIN' | 'CUSTOMER',
        accounts: {
          create: {
            id: cuid(), // ✅ gera um id único
            providerId: 'email',
            accountId: u.email,
            password: u.password,
          },
        },
      },
    })
    userRecords[u.email] = user.id
  }

  // --------
  // ORDERS + ITEMS
  // --------
  await prisma.order.create({
    data: {
      userId: userRecords['customer@example.com'],
      totalPrice: 31.98,
      shippingPrice: 5.0,
      status: 'PENDING',
      items: {
        create: [
          { bookId: bookRecords['Dune'], quantity: 1, priceAtPurchase: 18.99 },
          {
            bookId: bookRecords['The Hobbit'],
            quantity: 1,
            priceAtPurchase: 14.99,
          },
        ],
      },
    },
  })

  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
