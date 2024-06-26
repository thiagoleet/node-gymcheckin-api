import { verifyJwt } from "@/http/middlewares";
import { FastifyInstance } from "fastify";
import { create, validate, history, metrics } from "./controllers";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/history", history);
  app.get("/metrics", metrics);

  app.post("/gyms/:gymId/checkin", create);
  app.patch("/:checkInId/validate", validate);
}
