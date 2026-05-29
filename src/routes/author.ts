import { Hono } from 'hono'

const app = new Hono()

const authors = [
  {
    id: '1',
    name: 'Alice',
  },
  {
    id: '2',
    name: 'Bob',
  },
]

app.get('/', (c) => {
  return c.json(authors)
})

app.get('/:id', (c) => {
  const id = c.req.param('id')
  const author = authors.find((a) => a.id === id)

  if (author == null) {
    return c.json({ error: 'Author not found ' }, 404)
  }

  return c.json(author)
})

export default app
