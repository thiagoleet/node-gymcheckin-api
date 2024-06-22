import { describe, expect, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users.repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { InvalidCredentialsError } from "@/errors/";
import { AuthenticateUseCase } from "./authenticate";

describe("Authenticate Use Case", () => {
  let repository: UsersRepository;
  let sut: AuthenticateUseCase;

  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(repository);
  });

  it("should be able to authenticate", async () => {
    const name = "John Doe";
    const email = "johndoe@email.com";
    const password = "123456";

    // Hashing a password
    const password_hash = await hash(password, 6);

    // Creating a user
    await repository.create({
      name,
      email,
      password_hash,
    });

    const { user } = await sut.execute({
      email,
      password,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const email = "johndoe@email.com";
    const password = "123456";

    await expect(() =>
      sut.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const name = "John Doe";
    const email = "johndoe@email.com";
    const password = "123456";
    const wrongPassword = "654321";

    // Hashing a password
    const password_hash = await hash(password, 6);

    // Creating a user
    await repository.create({
      name,
      email,
      password_hash,
    });

    await expect(() =>
      sut.execute({
        email,
        password: wrongPassword,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
