import { makeCheckinUseCase } from "@/factories/make-checkin-use-case";
import { validLatiude, validLongitude } from "@/utils/validCoordinates";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckinParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine(validLatiude),
    longitude: z.number().refine(validLongitude),
  });

  const { latitude, longitude } = createCheckinBodySchema.parse(request.body);
  const { gymId } = createCheckinParamsSchema.parse(request.params);

  const useCase = makeCheckinUseCase();

  const { checkIn } = await useCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ message: "Check-in created", checkIn });
}
