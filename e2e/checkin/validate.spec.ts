import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "e2e/utils/users";
import { createCheckin } from "e2e/utils/checkins";
import { prisma } from "@/lib/prisma";

describe("[E2E] Validate Check-in", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate a check-in", async () => {
    const authResponse = await createAndAuthenticateUser(app, true);
    const { token } = authResponse.body;
    const checkInResponse = await createCheckin(app, token);
    const { checkIn } = checkInResponse.body;

    const response = await request(app.server)
      .patch(`/api/checkins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(204);

    const { validated_at } = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(validated_at).not.toBeNull();
    expect(validated_at).toEqual(expect.any(Date));
  });
});
