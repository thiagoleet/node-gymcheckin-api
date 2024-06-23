import { PrismaCheckInsRepository } from "@/repositories/prisma";
import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(repository);

  return useCase;
}
