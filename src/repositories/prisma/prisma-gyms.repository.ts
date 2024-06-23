import { Gym, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms.repository";
import {
  MAX_ITEMS_PER_PAGE,
  getPaginationParams,
} from "@/utils/getPaginationParams";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data });

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } });

    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    throw new Error("Method not implemented.");
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const [skip, _] = getPaginationParams(page);
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: MAX_ITEMS_PER_PAGE,
      skip,
    });

    return gyms;
  }
}
