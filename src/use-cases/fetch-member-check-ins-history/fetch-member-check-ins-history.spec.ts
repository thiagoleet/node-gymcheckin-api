import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { CheckInsRepository } from "@/repositories";
import { InMemoryCheckinsRepository } from "@/repositories/in-memory";
import { FetchMemberCheckInsHistoryUseCase } from "./fetch-member-check-ins-history";

describe("Fetch Member Check-ins History UseCase", () => {
  let repository: CheckInsRepository;
  let sut: FetchMemberCheckInsHistoryUseCase;

  beforeEach(async () => {
    repository = new InMemoryCheckinsRepository();
    sut = new FetchMemberCheckInsHistoryUseCase(repository);

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

    const { checkIns } = await sut.execute({ userId: "user-01", page: 1 });

    expect(checkIns.length).toBe(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    // Create checkin history

    for (let i = 1; i <= 24; i++) {
      vi.setSystemTime(new Date(2024, 5, i, 15, 50, 0));
      await repository.create({
        gym_id: `gym-${i.toString().padStart(2, "0")}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({ userId: "user-01", page: 2 });

    expect(checkIns.length).toBe(4);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
      expect.objectContaining({ gym_id: "gym-23" }),
      expect.objectContaining({ gym_id: "gym-24" }),
    ]);
  });
});
