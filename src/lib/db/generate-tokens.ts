import { randomInt, randomUUID } from "node:crypto";

import { db } from "@/lib/db";

const ONE_HOUR = 60 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

export async function generatePasswordResetToken(email: string) {
  const token = randomUUID();
  const expires = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken = await db.passwordResetToken.findFirst({
    where: { email },
  });
  if (existingToken) {
    return db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  return db.passwordResetToken.create({ data: { email, expires, token } });
}

export async function generateTwoFactorToken(email: string) {
  const token = randomInt(100_000, 999_999).toString();
  const expires = new Date(new Date().getTime() + FIVE_MINUTES);

  const existingToken = await db.twoFactorToken.findFirst({ where: { email } });
  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }

  return db.twoFactorToken.create({ data: { email, expires, token } });
}
