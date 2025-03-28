import fastify from "fastify"
import cors from '@fastify/cors' // Importe o plugin CORS
import { register } from "./http/controllers/register"
import { deleteCompany } from "./http/controllers/delete"
import { updateCompany } from "./http/controllers/update"
import { listCompany } from "./http/controllers/list"

import { createLinks } from "./http/controllers/create-link"
import { deleteLinks } from "./http/controllers/delete-link"
import { updateLinks } from "./http/controllers/update-link"

export const app = fastify()

app.register(cors, {
  origin: true, // Ou true para permitir todas as origens (não recomendado para produção)
})

app.post('/panel', register)
app.delete('/panel', deleteCompany)
app.patch('/panel', updateCompany)
app.post('/empresa', listCompany)