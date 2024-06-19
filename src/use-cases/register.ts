import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

const SALT_ROUNDS = 6;

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private repository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    const userWithSameEmail = await this.repository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error("User with this email already exists");
    }

    const password_hash = await hash(password, SALT_ROUNDS);

    await this.repository.create({
      name,
      email,
      password_hash,
    });
  }
}
