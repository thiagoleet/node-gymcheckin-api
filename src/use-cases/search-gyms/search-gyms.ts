import { GymsRepository } from "@/repositories";
import { Gym } from "@prisma/client";

type SearchGymsUseCaseProps = {
  query: string;
  page: number;
};

type SearchGymsUseCaseResponse = {
  gyms: Gym[];
};

export class SearchGymsUseCase {
  constructor(private repository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.repository.searchMany(query, page);

    return { gyms };
  }
}
