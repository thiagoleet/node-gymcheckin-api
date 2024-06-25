import { makeCreateGymsUseCase } from "@/factories/make-create-gym-use-case";
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

function validLatiude(value: number) {
  return Math.abs(value) >= -90 && Math.abs(value) <= 90;
}

function validLongitude(value: number) {
  return Math.abs(value) >= -180 && Math.abs(value) <= 180;
}
