import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "../utils/users";

describe("[E2E] Refresh", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh a token", async () => {
    const authResponse = await createAndAuthenticateUser(app);
    const cookies = authResponse.get("Set-Cookie") as string[];

    const response = await request(app.server)
      .patch("/api/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
