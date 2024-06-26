import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "e2e/utils/users";
import { createCheckin } from "e2e/utils/checkins";

describe("[E2E] Check-in Metrics", () => {
  beforeAll(async () => {
    await app.ready();

    vi.useFakeTimers();
  });
  afterAll(async () => {
    await app.close();

    vi.useRealTimers();
  });

  it("should be able to clist the count of check-ins", async () => {
    const authResponse = await createAndAuthenticateUser(app);
    const { token } = authResponse.body;
    const HISTORY_LENGTH = 10;

    for (let i = 1; i <= HISTORY_LENGTH; i++) {
      vi.setSystemTime(new Date(2024, 5, i, 15, 50, 0));
      await createCheckin(app, token);
    }

    const response = await request(app.server)
      .get("/api/checkins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(HISTORY_LENGTH);
  });
});
