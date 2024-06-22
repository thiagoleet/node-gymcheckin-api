import { describe, expect, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { UserAlreadyExistsError } from "@/errors";
import { CheckInUseCase } from "./check-in";
import { UsersRepository } from "@/repositories/users.repository";
import { CheckInsRepository } from "@/repositories/checkins.repository";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";

describe("Check In Use Case", () => {
  let repository: CheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    repository = new InMemoryCheckinsRepository();
    sut = new CheckInUseCase(repository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "unique-gym-id",
      userId: "unique-user-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
