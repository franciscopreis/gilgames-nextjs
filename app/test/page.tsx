import prisma from '@/lib/db'

export default async function TestPage() {
  const posts = await prisma.post.findMany()
  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
