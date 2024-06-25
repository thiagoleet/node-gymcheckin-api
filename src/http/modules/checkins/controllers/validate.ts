import { makeValidateCheckInUseCase } from "@/factories/make-validate-checkin-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckinParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckinParamsSchema.parse(request.params);

  const useCase = makeValidateCheckInUseCase();

  const { checkIn } = await useCase.execute({
    checkInId,
  });

  return reply.status(204).send({ message: "Check-in validated", checkIn });
}
