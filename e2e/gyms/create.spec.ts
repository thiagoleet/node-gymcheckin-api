import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "e2e/utils/users";
import { createGym } from "e2e/utils/gyms";

describe("[E2E] Create Gym", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const authResponse = await createAndAuthenticateUser(app);
    const { token } = authResponse.body;

    const response = await createGym(app, token);

    expect(response.status).toEqual(201);
    expect(response.body.gym).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });
});
