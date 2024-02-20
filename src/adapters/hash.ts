import { Scrypt } from "lucia";

export const hashed = {
  async hash(password: string): Promise<string> {
    const hashedPassword = await new Scrypt().hash(password);
    return hashedPassword;
  },

  async compare(password: string, hash: string): Promise<boolean> {
    const isValidPassword = await new Scrypt().verify(hash, password);
    return isValidPassword;
  },
};
