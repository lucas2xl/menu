import { UserRole } from "@/server/models/user";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOauth: boolean;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    emailVerified?: Date | null;
    colorScheme: string;
  }
}
