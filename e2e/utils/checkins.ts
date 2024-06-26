import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import request from "supertest";

const validGym = {
  title: "Valid Gym",
  description: "The best and the nearest gym in the world",
  phone: "+55123456789",
  latitude: -23.5913537,
  longitude: -46.6620717,
};

async function createGym() {
  const gym = await prisma.gym.create({
    data: validGym,
  });

  return gym;
}

export async function createCheckin(app: FastifyInstance, token: string) {
  // create a valid gym
  const gym = await createGym();

  const response = await request(app.server)
    .post(`/api/checkins/gyms/${gym.id}/checkin`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      latitude: -23.5913537,
      longitude: -46.6620717,
    });

  return response;
}
