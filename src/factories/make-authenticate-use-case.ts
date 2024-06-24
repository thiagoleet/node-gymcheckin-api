import { PrismaUsersRepository } from "@/repositories/prisma";
import { AuthenticateUseCase } from "@/use-cases/authenticate";

export function makeAuthenticateUseCase() {
  const repository = new PrismaUsersRepository();
  const useCase = new AuthenticateUseCase(repository);

  return useCase;
}
