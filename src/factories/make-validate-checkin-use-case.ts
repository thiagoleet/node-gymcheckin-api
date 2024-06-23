import { PrismaCheckInsRepository } from "@/repositories/prisma";
import { ValidateCheckInUseCase } from "@/use-cases/validate-checkin";

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(repository);

  return useCase;
}
