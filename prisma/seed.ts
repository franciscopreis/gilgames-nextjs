import prisma from '../lib/db'

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
      where: { id: name }, // usamos o próprio nome como "id temporário" para o upsert
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
      where: { id: name }, // idem

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

  for (const b of books) {
    const bookId = b.title + '-' + Math.random().toString(36).substring(2, 8) // cria um id único temporário

    const bookAuthors = b.authors.map((name) => ({ id: authorRecords[name] }))

    const bookCategories = b.categories.map((name) => ({
      id: categoryRecords[name],
    }))

    await prisma.book.upsert({
      where: { id: bookId },

      update: {},

      create: {
        id: bookId,

        title: b.title,

        description: b.description,

        price: b.price,

        stock: b.stock,

        authors: { connect: bookAuthors },

        categories: { connect: bookCategories },
      },
    })
  }

  // --------

  // ADMIN USER

  // --------

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },

    update: {},

    create: {
      email: 'admin@example.com',

      password: 'admin123', // só para o MVP

      role: 'ADMIN',
    },
  })

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error: ', e)

    process.exit(1)
  })

  .finally(async () => {
    await prisma.$disconnect()
  })
