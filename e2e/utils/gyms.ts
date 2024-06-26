import { FastifyInstance } from "fastify";
import request from "supertest";

const nearGym = {
  title: "Near Gym",
  description: "The best and the nearest gym in the world",
  phone: "+55123456789",
  latitude: -23.5913537,
  longitude: -46.6620717,
};

const farGym = {
  title: "Far Far Away Gym",
  description: "The furthest gym in the world",
  phone: "+55123456789",
  latitude: -23.6404395,
  longitude: -46.9348967,
};

export async function createGym(
  app: FastifyInstance,
  token: string,
  gym: any = nearGym
) {
  const response = await request(app.server)
    .post("/api/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send(gym);

  return response;
}

export async function createGyms(app: FastifyInstance, token: string) {
  const response = await Promise.all([
    createGym(app, token, nearGym),
    createGym(app, token, farGym),
  ]);

  return response;
}
