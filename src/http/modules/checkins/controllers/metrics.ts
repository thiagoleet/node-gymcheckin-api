import { makeGetUserMetricsUseCase } from "@/factories/make-get-user-metrics-use-case";
import { FastifyRequest, FastifyReply } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetUserMetricsUseCase();

  const { count } = await useCase.execute({ userId: request.user.sub });

  reply.status(200).send({ count });
}
