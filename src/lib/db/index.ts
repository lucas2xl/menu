import { PrismaClient } from "@prisma/client";

import { config } from "@/lib/config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      config.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (config.NODE_ENV !== "production") globalForPrisma.prisma = db;
