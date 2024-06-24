import { FastifyInstance } from "fastify";
import { register, authenticate, profile } from "@/http/controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get("/me", profile);
}
