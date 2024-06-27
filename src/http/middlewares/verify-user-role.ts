import { FastifyRequest, FastifyReply } from "fastify";

export function verifyUserRole(expectedRole: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, repy: FastifyReply) => {
    const { role } = request.user;

    if (role !== expectedRole) {
      repy.status(401).send({ message: "Unauthorized" });
    }
  };
}
