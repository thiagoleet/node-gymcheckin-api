import { makeFetchNearbyGymsUseCase } from "@/factories/make-fetch-nearby-gyms-use-case";
import { validLatiude, validLongitude } from "@/utils/validCoordinates";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(validLatiude),
    longitude: z.coerce.number().refine(validLongitude),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const useCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await useCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
