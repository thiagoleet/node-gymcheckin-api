import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";
import { env } from "@/env";
import { usersRoutes } from "./http/modules/users/routes";
import { gymsRoutes } from "./http/modules/gyms/routes";
import { checkInsRoutes } from "./http/modules/checkins/routes";

export const app = fastify();

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes, { prefix: "api" });
app.register(gymsRoutes, { prefix: "api/gyms" });
app.register(checkInsRoutes, { prefix: "api/checkins" });

// Error handling
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
