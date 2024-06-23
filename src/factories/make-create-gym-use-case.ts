import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { CreateGymUseCase } from "@/use-cases/create-gym";

export function makeCreateGymsUseCase() {
  const repository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(repository);

  return useCase;
}
