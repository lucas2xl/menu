import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";

import { env } from "@/config/env";
import { db } from "@/lib/db";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },

  getUserAttributes: (attributes) => {
    return {
      theme: attributes.theme,
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

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes {
  theme: string;
}
