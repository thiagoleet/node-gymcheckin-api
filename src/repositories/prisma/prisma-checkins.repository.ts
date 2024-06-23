import { Checkin, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../checkins.repository";
import { prisma } from "@/lib/prisma";
import { getPaginationParams } from "@/utils/getPaginationParams";
import dayjs from "dayjs";

const ITEMS_PER_PAGE = 20;

export class PrismaCheckInsRepository implements CheckInsRepository {
  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkin.count({ where: { user_id: userId } });

    return count;
  }
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn = await prisma.checkin.create({ data });

    return checkIn;
  }

  async findById(id: string): Promise<Checkin | null> {
    const checkIn = await prisma.checkin.findUnique({ where: { id } });

    return checkIn;
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<Checkin | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    const [start] = getPaginationParams(page);

    const checkins = await prisma.checkin.findMany({
      where: {
        user_id: userId,
      },
      take: ITEMS_PER_PAGE,
      skip: start,
    });

    return checkins;
  }

  async save(data: Checkin): Promise<Checkin> {
    const checkIn = await prisma.checkin.update({
      where: { id: data.id },
      data,
    });

    return checkIn;
  }
}
