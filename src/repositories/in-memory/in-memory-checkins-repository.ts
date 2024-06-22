import { Checkin, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../checkins.repository";

export class InMemoryCheckinsRepository implements CheckInsRepository {
  private checkins: Checkin[] = [];

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn: Checkin = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.checkins.push(checkIn);

    return checkIn;
  }
}
