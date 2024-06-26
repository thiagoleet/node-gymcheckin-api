import { FastifyInstance } from "fastify";
import { verifyJwt, verifyUserRole } from "@/http/middlewares";
import { create, nearby, search } from "./controllers";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/nearby", nearby);
  app.get("/search", search);

  app.post("/", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
