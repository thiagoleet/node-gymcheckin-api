import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "e2e/utils/users";
import { createGyms } from "e2e/utils/gyms";

describe("[E2E] Search Gym", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to search for a gym", async () => {
    const authResponse = await createAndAuthenticateUser(app, true);
    const { token } = authResponse.body;

    await createGyms(app, token);

    const response = await request(app.server)
      .get("/api/gyms/search")
      .query({ q: "Near" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
