import { GymsRepository } from "@/repositories";
import { Gym } from "@prisma/client";

type FetchNearbyGymsUseCaseProps = {
  userLatitude: number;
  userLongitude: number;
};

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[];
};

export class FetchNearbyGymsUseCase {
  constructor(private repository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.repository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
