import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { CheckInsRepository } from "@/repositories";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory/in-memory-checkins.repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

describe("Get User Metrics Use Case", () => {
  let repository: CheckInsRepository;
  let sut: GetUserMetricsUseCase;

  beforeEach(async () => {
    repository = new InMemoryCheckinsRepository();
    sut = new GetUserMetricsUseCase(repository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to fetch check-ins history", async () => {
    // Create a checkin
    vi.setSystemTime(new Date(2024, 5, 3, 15, 50, 0));
    await repository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    vi.setSystemTime(new Date(2024, 5, 4, 15, 50, 0));
    await repository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { count } = await sut.execute({ userId: "user-01" });

    expect(count).toBe(2);
  });
});
