import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { ValidateCheckInUseCase } from "./validate-checkin";
import { CheckInsRepository } from "@/repositories";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory";
import { LateCheckInValidateError, ResourceNotFoundError } from "@/errors";

describe("Validate Check In Use Case", () => {
  let repository: CheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(async () => {
    repository = new InMemoryCheckinsRepository();
    sut = new ValidateCheckInUseCase(repository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckin = await repository.create({
      gym_id: "unique-gym-id",
      user_id: "unique-user-id",
    });

    const { checkIn } = await sut.execute({ checkInId: createdCheckin.id });

    expect(checkIn?.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({ checkInId: "inexistent-checkin-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after  20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40));

    const createdCheckin = await repository.create({
      gym_id: "unique-gym-id",
      user_id: "unique-user-id",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({ checkInId: createdCheckin.id })
    ).rejects.toBeInstanceOf(LateCheckInValidateError);
  });
});
