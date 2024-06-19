import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "@/env";

export const app = fastify();

app.register(appRoutes, { prefix: "api" });

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // TODO: Send error to monitoring service
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
