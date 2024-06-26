import { makeFetchMemberCheckInsHistoryUseCase } from "@/factories/make-fetch-member-check-ins-history-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
  });

  const { page } = checkinHistoryQuerySchema.parse(request.query);

  const useCase = makeFetchMemberCheckInsHistoryUseCase();

  const { checkIns } = await useCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
