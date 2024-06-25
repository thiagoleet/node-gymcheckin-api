import { makeFetchNearbyGymsUseCase } from "@/factories/make-fetch-nearby-gyms-use-case";
import { validLatiude, validLongitude } from "@/utils/validCoordinates";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(validLatiude),
    longitude: z.number().refine(validLongitude),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const nearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}
