import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function createLinks(request: FastifyRequest, reply: FastifyReply) {
  const createLinkBodySchema = z.object({
    companyId: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    icon_url: z.string(),
    order: z.number(),
  })

  const { companyId, title, description, url, icon_url, order } = createLinkBodySchema.parse(request.body)

  const companyExists = await prisma.company.findUnique({
    where: { id: companyId }
  })

  if (!companyExists) {
    return reply.status(404).send({ error: 'Empresa não encontrada' })
  }

  const link = await prisma.links.create({
    data: {
      title,
      description,
      url,
      icon_url,
      order,
      company_id: companyId
    }
  })

  return reply.status(201).send(link)
}