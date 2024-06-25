import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { authenticateUser, createUser, getUserProfile } from "../utils/users";

describe("[E2E] Profile", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await createUser(app);

    const authResponse = await authenticateUser(app);
    const { token } = authResponse.body;
    const response = await getUserProfile(app, token);

    expect(response.status).toEqual(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });
});
