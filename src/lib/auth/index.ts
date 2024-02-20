import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";

import { env } from "@/config/env";
import { User } from "@prisma/client";
import { db } from "../db";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },

  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      imageUrl: attributes.imageUrl,
      role: attributes.role,
      isTwoFactorEnabled: attributes.isTwoFactorEnabled,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
  sessionExpiresIn: new TimeSpan(7, "d"),
  sessionCookie: {
    name: "session",

    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

// export const discord = new Discord(
//   env.DISCORD_CLIENT_ID,
//   env.DISCORD_CLIENT_SECRET,
//   env.NEXT_PUBLIC_APP_URL + "/login/discord/callback",
// );

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<User, "password"> {}
