import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "e2e/utils/users";
import { createCheckin } from "e2e/utils/checkins";

describe("[E2E] Create Check-in", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const authResponse = await createAndAuthenticateUser(app);
    const { token } = authResponse.body;

    const response = await createCheckin(app, token);

    expect(response.status).toEqual(201);
    expect(response.body.checkIn).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });
});
