import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prisma";

const SALT_ROUNDS = 6;

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseProps) {
  const repository = new PrismaUsersRepository();

  const userWithSameEmail = await repository.findUnique({ email });

  if (userWithSameEmail) {
    throw new Error("User with this email already exists");
  }

  const password_hash = await hash(password, SALT_ROUNDS);

  await repository.create({
    name,
    email,
    password_hash,
  });
}
