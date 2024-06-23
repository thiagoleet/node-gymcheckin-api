import { GymsRepository } from "@/repositories";
import { describe, expect, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory";

describe("Search Gyms Use Case", () => {
  let repository: GymsRepository;
  let sut: SearchGymsUseCase;

  beforeEach(() => {
    repository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(repository);
  });

  it("should be able to search for gyms", async () => {
    await repository.create({
      id: "gym-01",
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -23.5913537,
      longitude: -46.6620717,
    });

    await repository.create({
      id: "gym-02",
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -23.5913537,
      longitude: -46.6620717,
    });

    const { gyms } = await sut.execute({ query: "Javascript", page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ id: "gym-01" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 24; i++) {
      await repository.create({
        id: `gym-${i.toString().padStart(2, "0")}`,
        title: "Javascript Gym",
        description: null,
        phone: null,
        latitude: -23.5913537,
        longitude: -46.6620717,
      });
    }

    const { gyms } = await sut.execute({ query: "Javascript", page: 2 });

    expect(gyms).toHaveLength(4);
    expect(gyms).toEqual([
      expect.objectContaining({ id: "gym-21" }),
      expect.objectContaining({ id: "gym-22" }),
      expect.objectContaining({ id: "gym-23" }),
      expect.objectContaining({ id: "gym-24" }),
    ]);
  });
});
