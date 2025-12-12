import { nanoid } from 'nanoid'
import prisma from '../lib/db'
import slugify from 'slugify' // Para gerar slug amigável
import { BookCondition } from '@/lib/generated/prisma/enums'

async function main() {
  console.log('🌱 Seeding database...')

  // -------- CATEGORIES --------
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

  // -------- AUTHORS --------
  const authors = [
    'Hans Christian Andersen',
    'René Descartes',
    'Jacques Lacan',
    'Montaigne',
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

  // -------- BOOKS --------
  const books = [
    {
      title: 'Contos',
      description: 'Uma coleção de contos para todas as idades.',
      price: 9.99,
      stock: 20,
      authors: ['Hans Christian Andersen'],
      categories: ['Fiction'],
      condition: 'GOOD',
      coverImage: '/book-covers/andersen-contos.jpeg',
    },
    {
      title: 'Discurso do Método & As Paixões da Alma',
      description: 'Obra filosófica de René Descartes.',
      price: 9.99,
      stock: 15,
      authors: ['René Descartes'],
      categories: ['Non-fiction', 'Classic'],
      condition: 'LIKE_NEW',
      coverImage: '/book-covers/descartes-discurso-paixoes.jpeg',
    },
    {
      title: 'A Família',
      description: 'Estudo sobre a psicanálise de Jacques Lacan.',
      price: 9.99,
      stock: 10,
      authors: ['Jacques Lacan'],
      categories: ['Non-fiction'],
      condition: 'GOOD',
      coverImage: '/book-covers/lacan-familia.jpeg',
    },
    {
      title: 'Ensaios',
      description: 'Reflexões de Montaigne sobre a vida e humanidade.',
      price: 9.99,
      stock: 12,
      authors: ['Montaigne'],
      categories: ['Classic', 'Non-fiction'],
      condition: 'GOOD',
      coverImage: '/book-covers/montaigne-ensaios.jpeg',
    },
  ]
  const bookRecords: Record<string, string> = {}

  for (const b of books) {
    const bookAuthors = b.authors.map((name) => ({ id: authorRecords[name] }))
    const bookCategories = b.categories.map((name) => ({
      id: categoryRecords[name],
    }))

    const conditionEnum: BookCondition = b.condition as BookCondition

    const book = await prisma.book.upsert({
      where: { title: b.title },
      update: {
        slug: slugify(b.title, { lower: true, strict: true }),
        coverImage: b.coverImage,
      },
      create: {
        title: b.title,
        slug: slugify(b.title, { lower: true, strict: true }),
        description: b.description,
        price: b.price,
        stock: b.stock,
        condition: conditionEnum,
        coverImage: b.coverImage,
        authors: { connect: bookAuthors },
        categories: { connect: bookCategories },
      },
    })

    bookRecords[b.title] = book.id

    // BookPriceHistory inicial
    await prisma.bookPriceHistory.create({
      data: { bookId: book.id, price: b.price },
    })
  }

  // -------- USERS --------
  const users = [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      role: 'ADMIN',
      password: 'admin123',
    },
    {
      firstName: 'Customer',
      lastName: 'User',
      email: 'customer@example.com',
      role: 'CUSTOMER',
      password: 'customer123',
      phone: '+351912345678',
    },
  ]

  const userRecords: Record<string, string> = {}

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: nanoid(),
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        role: u.role as 'ADMIN' | 'CUSTOMER',
        emailVerified: true,
        phone: u.phone,
        accounts: {
          create: {
            id: nanoid(),
            providerId: 'email',
            accountId: u.email,
            password: u.password,
          },
        },
      },
    })
    userRecords[u.email] = user.id
  }

  // -------- ADDRESS para Customer --------
  const shippingAddress = await prisma.address.create({
    data: {
      userId: userRecords['customer@example.com'],
      type: 'SHIPPING',
      street: 'Rua das Flores, 123',
      city: 'Lisbon',
      postalCode: '1000-001',
      country: 'Portugal',
      phone: '+351912345678',
    },
  })

  const billingAddress = await prisma.address.create({
    data: {
      userId: userRecords['customer@example.com'],
      type: 'BILLING',
      street: 'Av. da Liberdade, 50',
      city: 'Lisbon',
      postalCode: '1250-001',
      country: 'Portugal',
      phone: '+351912345678',
    },
  })

  // -------- ORDERS --------
  await prisma.order.create({
    data: {
      userId: userRecords['customer@example.com'],
      shippingAddressId: shippingAddress.id,
      billingAddressId: billingAddress.id,
      totalPrice: 19.98,
      shippingPrice: 5.0,
      status: 'PENDENTE',
      paymentMethod: 'STRIPE',
      items: {
        create: [
          {
            bookId: bookRecords['Contos'],
            quantity: 1,
            priceAtPurchase: 9.99,
          },
          {
            bookId: bookRecords['Discurso do Método & As Paixões da Alma'],
            quantity: 1,
            priceAtPurchase: 9.99,
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
