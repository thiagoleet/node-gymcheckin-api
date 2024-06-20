import { UsersRepository } from "@/repositories/users.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists.error";
import { User } from "@prisma/client";

const SALT_ROUNDS = 6;

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private repository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.repository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, SALT_ROUNDS);

    const user = await this.repository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
