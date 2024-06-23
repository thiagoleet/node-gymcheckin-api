import { PrismaCheckInsRepository } from "@/repositories/prisma";
import { FetchMemberCheckInsHistoryUseCase } from "@/use-cases/fetch-member-check-ins-history";

export function makeFetchMemberCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInsRepository();
  const useCase = new FetchMemberCheckInsHistoryUseCase(repository);

  return useCase;
}
