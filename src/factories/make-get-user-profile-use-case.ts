import { PrismaUsersRepository } from "@/repositories/prisma";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile/get-user-profile";

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(repository);

  return useCase;
}
