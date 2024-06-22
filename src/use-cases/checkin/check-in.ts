import { ResourceNotFoundError } from "@/errors";
import { CheckInsRepository, GymsRepository } from "@/repositories";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { Checkin } from "@prisma/client";

type CheckInUseCaseProps = {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
};

type CheckInUseCaseResponse = {
  checkIn: Checkin;
};

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseProps): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError("Gym not found");
    }

    // Check if user is close to the gym
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error("User is too far from the gym");
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
