import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires an explicit driver adapter — it no longer reads
// DATABASE_URL on its own. See prisma.config.ts for the Migrate-side URL.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env (see .env.example) — a free Neon or Supabase Postgres connection string works.",
    );
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Lazy by design: constructing PrismaClient at module scope would run at
// import time, which includes Next.js's build-time "collecting page data"
// step for every API route — so a missing DATABASE_URL would fail the whole
// build, not just the request that actually needs the database. Deferring
// construction to first property access means a misconfigured env only
// breaks the specific request that touches the DB.
function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrismaClient() as object, prop, receiver);
  },
});
