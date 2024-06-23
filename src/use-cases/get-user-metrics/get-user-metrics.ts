import { CheckInsRepository } from "@/repositories";

type GetUserMetricsUseCaseProps = {
  userId: string;
};

type GetUserMetricsUseCaseResponse = {
  count: number;
};

export class GetUserMetricsUseCase {
  constructor(private repository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseProps): Promise<GetUserMetricsUseCaseResponse> {
    const count = await this.repository.countByUserId(userId);

    return { count };
  }
}
