import { describe, expect, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { GymsRepository } from "@/repositories";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms.repository";

describe("Create Gym Use Case", () => {
  let repository: GymsRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    repository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(repository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.5913537,
      longitude: -46.6620717,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
