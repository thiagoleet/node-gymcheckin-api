import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/errors";
import { makeAuthenticateUseCase } from "@/factories/make-authenticate-use-case";

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
    const useCase = makeAuthenticateUseCase();

    const { user } = await useCase.execute({ email, password });

    const token = await getToken(reply, user);
    const refreshToken = await getToken(reply, user, true);

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ message: "User authenticated", token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}

async function getToken(
  reply: FastifyReply,
  user: { id: string },
  refreshToken: boolean = false
) {
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
        expiresIn: refreshToken ? "7d" : "10m",
      },
    }
  );

  return token;
}
