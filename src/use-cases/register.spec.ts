import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import bcrypt from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists.error";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registeruseCase = new RegisterUseCase(usersRepository);

    const { user } = await registeruseCase.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not allow registration with the same email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registeruseCase = new RegisterUseCase(usersRepository);

    const email = "johndoe@email.com";

    await registeruseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(() =>
      registeruseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("shoudl be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registeruseCase = new RegisterUseCase(usersRepository);

    const { user } = await registeruseCase.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
