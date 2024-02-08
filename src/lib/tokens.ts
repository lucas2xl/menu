import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetTokenByEmail,
} from "@/server/db/db/password-reset-token";
import {
  createTwoFactorToken,
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "@/server/db/db/two-factor-token";
import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/server/db/db/verification-token";

const ONE_HOUR = 60 * 60 * 1000;
const FIVE_MINUTES = 5 * 60 * 1000;

export async function generateToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    return deleteVerificationToken(existingToken.id);
  }

  return createVerificationToken({ email, expires, token });
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + ONE_HOUR);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    return deletePasswordResetToken(existingToken.id);
  }

  return createPasswordResetToken({ email, expires, token });
}

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date(new Date().getTime() + FIVE_MINUTES);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    return deleteTwoFactorToken(existingToken.id);
  }

  return createTwoFactorToken({ email, expires, token });
}
