import { describe, expect, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users.repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { ResourceNotFoundError } from "@/errors/";
import { GetUserProfileUseCase } from "./get-user-profile";

describe("Get User Profile Use Case", () => {
  let usersRepository: UsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const name = "John Doe";
    const email = "johndoe@email.com";
    const password = "123456";

    // Hashing a password
    const password_hash = await hash(password, 6);

    // Creating a user
    const createdUser = await usersRepository.create({
      name,
      email,
      password_hash,
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(name);
    expect(user.email).toEqual(email);
  });

  it("should not be able to get user profile with wrong user id", async () => {
    const userId = "wrong-user-id";

    expect(() => sut.execute({ userId })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});