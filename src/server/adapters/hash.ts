import bcrypt from "bcryptjs";

const SALTS = 10;

export const hashed = {
  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALTS);
    return hashedPassword;
  },

  async compare(password: string, hash: string): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, hash);
    return isValidPassword;
  },
};
