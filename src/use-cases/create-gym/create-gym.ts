import { GymsRepository } from "@/repositories";
import { Gym } from "@prisma/client";

type CreateGymUseCaseProps = {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
};

type CreateGymUseCaseResponse = {
  gym: Gym;
};

export class CreateGymUseCase {
  constructor(private repository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
    const gym = await this.repository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
