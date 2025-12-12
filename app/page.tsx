'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/custom/card'
import Image from 'next/image'

// Dados de exemplo para categorias e livros
const categories = [
  { name: 'Poesia', image: '/romance.jpg' },
  { name: 'Prosa', image: '/ficcao.jpg' },
  { name: 'Outros', image: '/portuguesa.jpg' },
]

const books = [
  {
    title: 'Contos',
    author: 'Hans Christian Andersen',
    price: '€9,99',
    image: '/book-covers/andersen-contos.jpeg',
  },
  {
    title: 'Discurso do Método & As Paixões da Alma',
    author: 'René Descartes',
    price: '€9,99',
    image: '/book-covers/descartes-discurso-paixoes.jpeg',
  },
  {
    title: 'A Família',
    author: 'Jacques Lacan',
    price: '€9,99',
    image: '/book-covers/lacan-familia.jpeg',
  },
  {
    title: 'Ensaios',
    author: 'Montaigne',
    price: '€9,99',
    image: '/book-covers/montaigne-ensaios.jpeg',
  },
]

export default function HomePage() {
  return (
    <div className="font-inter">
      {/* Hero */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center">
        {/* Imagem de fundo */}
        <Image
          src="/gilgames-gray-hero.png"
          alt="Fundo com entalhe de Gilgamesh"
          fill
          className="object-cover -z-10 dark:filter dark:invert "
        />

        {/* Overlay escura para contraste */}
        <div className="absolute inset-0 bg-[#4175BE]/30 -z-5"></div>

        {/* Conteúdo do Hero */}
        <h1 className=" text-4xl md:text-6xl mb-4 text-white drop-shadow-lg z-10">
          Livraria GILGĀMEŠ
        </h1>
        <p className="font-inter text-lg md:text-2xl mb-6 text-white drop-shadow-md z-10">
          Aqui poderás encontrar livros em segunda mão para todos os gostos.
        </p>
        <Button size="lg" variant="default" className="z-10 border">
          Dá uma olhada
        </Button>
      </section>

      {/* Categorias */}
      {/* <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl mb-8 text-center">Categorias Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardHeader className="p-0">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={400}
                  className="w-auto h-auto  rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-xl">{cat.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Novidades */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl mb-8 text-center">Novidades</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 ">
          {books.map((book) => (
            <Card
              key={book.title}
              className="cursor-pointer hover:shadow-lg transition p-2 gap-2" // Acrescentei gap-2
            >
              <CardHeader className="p-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={400}
                  height={400}
                  className="w-auto h-auto object-contain rounded-t-lg p-2"
                />
              </CardHeader>

              {/* Adicionei margem inferior, pois removi py-6 do Card */}
              {/* Acrescentei a div para garantir que os botões comprar ficam alinhados */}
              <CardContent className="mb-4 justify-between flex flex-col h-full">
                <div>
                  <CardTitle className="text-lg">
                    {/* Eventualmente dar um limite de palavras */}
                    {book.title}
                  </CardTitle>
                  <p className="font-inter text-sm text-muted-foreground">
                    {book.author}
                  </p>
                  <p className="font-inter font-semibold mt-2">{book.price}</p>
                </div>

                <Button className="mt-2 w-full">Comprar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted p-12 text-center rounded-lg max-w-2xl mx-auto my-16">
        <h2 className="text-2xl mb-4">Receba novidades e promoções</h2>
        <p className="font-inter mb-6">
          Subscreva a nossa newsletter para não perder nenhum lançamento.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 justify-center">
          <Input
            type="email"
            placeholder="O teu email"
            className="flex-1 border-primary dark:border-secondary"
          />
          <Button type="submit">Subscrever</Button>
        </form>
      </section>
    </div>
  )
}
