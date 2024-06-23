import { GymsRepository } from "@/repositories";
import { describe, expect, it, beforeEach } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory";

describe("Fetch Nearby Gyms Use Case", () => {
  let repository: GymsRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(async () => {
    repository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(repository);
  });

  it("should be able to find nearby gyms", async () => {
    await repository.create({
      title: "Near Gym",
      latitude: -23.5913537,
      longitude: -46.6620717,
    });

    await repository.create({
      title: "Far Far Away Gym",
      latitude: -23.6404395,
      longitude: -46.9348967,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5913537,
      userLongitude: -46.6620717,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
