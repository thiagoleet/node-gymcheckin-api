import { CheckInsRepository } from "@/repositories";
import { Checkin } from "@prisma/client";

type FetchMemberCheckInsHistoryUseCaseProps = {
  userId: string;
  page: number;
};
type FetchMemberCheckInsHistoryUseCaseResponse = {
  checkIns: Checkin[];
};

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private repository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseProps): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.repository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
