import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { CheckInsRepository, GymsRepository } from "@/repositories";
import {
  InMemoryCheckinsRepository,
  InMemoryGymsRepository,
} from "@/repositories/in-memory";
import { Gym } from "@prisma/client";
import { MaxDistanceError, MaxNumberOfCheckInsError } from "@/errors";

describe("Check In Use Case", () => {
  let repository: CheckInsRepository;
  let gymsRepository: GymsRepository;
  let sut: CheckInUseCase;
  let gym: Gym;

  beforeEach(async () => {
    repository = new InMemoryCheckinsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(repository, gymsRepository);

    vi.useFakeTimers();

    gym = await gymsRepository.create({
      title: "Javascript Gym",
      latitude: -23.5913537,
      longitude: -46.6620717,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: "unique-user-id",
      userLatitude: -23.5913537,
      userLongitude: -46.6620717,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // TDD: red, green, refactor
  it("should not be able to check in twice at the same day", async () => {
    vi.setSystemTime(new Date(2024, 5, 3, 15, 50, 0));

    // First check in
    await sut.execute({
      gymId: gym.id,
      userId: "unique-user-id",
      userLatitude: -23.5913537,
      userLongitude: -46.6620717,
    });

    // Second check in
    await expect(() =>
      sut.execute({
        gymId: gym.id,
        userId: "unique-user-id",
        userLatitude: -23.5913537,
        userLongitude: -46.6620717,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in twice at different days", async () => {
    vi.setSystemTime(new Date(2024, 5, 3, 15, 50, 0));

    // First check in
    await sut.execute({
      gymId: gym.id,
      userId: "unique-user-id",
      userLatitude: -23.5913537,
      userLongitude: -46.6620717,
    });

    vi.setSystemTime(new Date(2024, 5, 4, 15, 50, 0));

    // Second check in
    const { checkIn } = await sut.execute({
      gymId: gym.id,
      userId: "unique-user-id",
      userLatitude: -23.5913537,
      userLongitude: -46.6620717,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    const distantGym = await gymsRepository.create({
      title: "Far Far Away Gym",
      latitude: -23.5898527,
      longitude: -46.6886233,
    });

    await expect(() =>
      sut.execute({
        gymId: distantGym.id,
        userId: "unique-user-id",
        userLatitude: -23.5913537,
        userLongitude: -46.6620717,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
