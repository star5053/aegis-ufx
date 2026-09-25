import { PrismaClient } from "@prisma/client";
import { ensureDemoData } from "../src/lib/seed-demo";

const prisma = new PrismaClient();

async function main() {
  const result = await ensureDemoData(prisma);
  console.log(result.seeded ? "Seed complete" : "Already seeded");
  console.log("Demo logins (password: Demo123!)");
  console.log("  owner@aegis.dev   → AEGIS Control Center");
  console.log("  henry@ufx.app     → UFX user");
  console.log("  maya@ufx.app      → UFX user");
  console.log("  mod@aegis.dev     → Moderator");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
