import { PrismaUsersRepository } from "@/repositories/prisma";
import { RegisterUseCase } from "@/use-cases/register";

export function makeRegisterUseCase() {
  const repository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(repository);

  return registerUseCase;
}
