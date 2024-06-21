import { describe, expect, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { UserAlreadyExistsError } from "../errors/user-alredy-exists.error";
import { RegisterUseCase } from "./register";
import { UsersRepository } from "@/repositories/users.repository";

describe("Register Use Case", () => {
  let usersRepository: UsersRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not allow registration with the same email", async () => {
    const email = "johndoe@email.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("shoudl be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
