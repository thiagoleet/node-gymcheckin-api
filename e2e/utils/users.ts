import request from "supertest";
import { FastifyInstance } from "fastify";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "123456",
};

const api = {
  authenticate: "/api/sessions",
  register: "/api/users",
};

/**
 * Create a user for testing
 *
 * @export
 * @param {FastifyInstance} app
 * @return {*}
 */
export async function createUser(app: FastifyInstance) {
  const response = await request(app.server).post(api.register).send(user);

  return response;
}

/**
 * Authenticate a user for testing
 *
 * @export
 * @param {FastifyInstance} app
 * @return {*}
 */
export async function authenticateUser(app: FastifyInstance) {
  const response = await request(app.server).post(api.authenticate).send({
    email: user.email,
    password: user.password,
  });

  return response;
}

/**
 * Create and authenticate a user for testing
 *
 * @export
 * @param {FastifyInstance} app
 * @return {*}
 */
export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false
) {
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password_hash: await hash(user.password, 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const response = await authenticateUser(app);

  return response;
}

/**
 * Get the user profile (testing only)
 *
 * @export
 * @param {FastifyInstance} app
 * @param {string} token
 * @return {*}
 */
export async function getUserProfile(app: FastifyInstance, token: string) {
  const response = await request(app.server)
    .get("/api/me")
    .set("Authorization", `Bearer ${token}`)
    .send();

  return response;
}
