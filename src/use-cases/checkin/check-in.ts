import { CheckInsRepository } from "@/repositories/checkins.repository";
import { Checkin } from "@prisma/client";

type CheckInUseCaseProps = {
  userId: string;
  gymId: string;
};

type CheckInUseCaseResponse = {
  checkIn: Checkin;
};

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseProps): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
