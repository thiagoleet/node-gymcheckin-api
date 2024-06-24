import { FastifyInstance } from "fastify";
import {
  register,
  authenticate,
  profile,
} from "@/http/modules/users/controllers";
import { verifyJwt } from "@/http/middlewares";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get(
    "/me",
    {
      onRequest: [verifyJwt],
    },
    profile
  );
}
