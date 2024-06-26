import { makeGetUserProfileUseCase } from "@/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;

  const useCase = makeGetUserProfileUseCase();

  const { user } = await useCase.execute({ userId: sub });

  // TODO: Prepare a response type
  return reply.status(200).send({
    message: "User profile",
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
