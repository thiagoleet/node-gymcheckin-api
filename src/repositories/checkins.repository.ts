import { Checkin, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>;
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>;
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>;
}
