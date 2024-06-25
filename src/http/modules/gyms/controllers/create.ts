import { makeCreateGymsUseCase } from "@/factories/make-create-gym-use-case";
import { validLatiude, validLongitude } from "@/utils/validCoordinates";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(validLatiude),
    longitude: z.number().refine(validLongitude),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymsUseCase();

  const { gym } = await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send({ message: "Gym created", gym });
}
