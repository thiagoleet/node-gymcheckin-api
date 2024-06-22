import { Checkin, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInsRepository } from "../checkins.repository";
import { MaxNumberOfCheckInsError } from "@/errors";

export class InMemoryCheckinsRepository implements CheckInsRepository {
  private items: Checkin[];

  constructor() {
    this.items = [];
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkInOnSameDate = await this.findByUserIdOnDate(
      data.user_id,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError("User already checked in today");
    }

    const checkIn: Checkin = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    return this.items
      .filter((checkin) => checkin.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }
}
