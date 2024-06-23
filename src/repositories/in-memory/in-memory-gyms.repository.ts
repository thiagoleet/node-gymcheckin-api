import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymsRepository } from "../gyms.repository";
import { getPaginationParams } from "@/utils/getPaginationParams";

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[];

  constructor() {
    this.items = [];
  }

  async findById(id: string): Promise<Gym | null> {
    return this.items.find((gym) => gym.id === id) || null;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.title.includes(query))
      .slice(...getPaginationParams(page));
  }
}
