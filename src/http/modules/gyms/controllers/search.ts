import { makeSearchGymsUseCase } from "@/factories/make-search-gyms-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().int().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.query);

  const useCase = makeSearchGymsUseCase();

  const { gyms } = await useCase.execute({ query: q, page });

  return reply.status(200).send({ gyms });
}
