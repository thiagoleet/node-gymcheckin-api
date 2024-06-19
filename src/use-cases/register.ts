import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SALT_ROUNDS = 6;

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

async function checkIfEmailExists(email: string) {
  const userWithSameEmail = await prisma.user.findUnique({ where: { email } });

  if (userWithSameEmail) {
    throw new Error("User with this email already exists");
  }
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseProps) {
  await checkIfEmailExists(email);

  const password_hash = await hash(password, SALT_ROUNDS);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
