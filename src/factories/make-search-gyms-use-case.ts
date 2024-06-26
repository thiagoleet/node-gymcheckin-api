import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { SearchGymsUseCase } from "@/use-cases/search-gyms";

export function makeSearchGymsUseCase() {
  const repository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(repository);

  return useCase;
}
