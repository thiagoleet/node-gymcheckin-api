import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users.repository";
import { ResourceNotFoundError } from "@/errors";

type GetUserProfileUseCaseProps = {
  userId: string;
};

type GetUserProfileUseCaseResponse = {
  user: User;
};

export class GetUserProfileUseCase {
  constructor(private repository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseProps): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
