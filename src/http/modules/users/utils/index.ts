import { FastifyReply } from "fastify";

export async function createToken(
  reply: FastifyReply,
  user: { id: string },
  isRefreshToken: boolean = false
) {
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
        expiresIn: isRefreshToken ? "7d" : "10m",
      },
    }
  );

  return token;
}
