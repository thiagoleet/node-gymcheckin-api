import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma";
import { InvalidCredentialsError } from "@/use-cases/errors";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send({ message: "User authenticated" });
}
