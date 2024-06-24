import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { authenticateUser, createUser } from "./utils";

describe("[E2E] Authenticate", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await createUser(app);

    const response = await authenticateUser(app);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
