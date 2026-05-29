import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

const app = new Hono()

const authors = [
  {
    id: '1',
    name: 'Alice',
    birthday: new Date(),
  },
  {
    id: '2',
    name: 'Bob',
  },
]

const createAuthorSchema = z.object({
  name: z.string().min(1),
  birthday: z.coerce.date().optional(),
})

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

app.post('/', sValidator('json', createAuthorSchema), (c) => {
  const data = c.req.valid('json')
  const newAuthor = { id: crypto.randomUUID(), ...data }
  authors.push(newAuthor)

  return c.json(newAuthor, 201)
})

export default app
