import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { UsersRepository } from "@/repositories/users.repository";
import { InvalidCredentialsError } from "../../errors";

type AuthenticateUseCaseProps = {
  email: string;
  password: string;
};

type AuthenticateUseCaseResponse = {
  user: User;
};

export class AuthenticateUseCase {
  constructor(private repository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
