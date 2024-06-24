import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const { sub } = request.user;

  return reply.status(200).send({ message: "User profile" });
}
