import request from "supertest";
import { FastifyInstance } from "fastify";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "123456",
};

const api = {
  authenticate: "/api/sessions",
  register: "/api/users",
};

export async function createUser(app: FastifyInstance) {
  const response = await request(app.server).post(api.register).send(user);

  return response;
}

export async function authenticateUser(app: FastifyInstance) {
  const response = await request(app.server).post(api.authenticate).send({
    email: user.email,
    password: user.password,
  });

  return response;
}
