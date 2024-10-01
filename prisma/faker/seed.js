import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Import seeder functions
import * as userFaker from "./user.js";
import * as questionFaker from "./questions.js";
import * as languageFaker from "./languages.js";
import * as lessonFaker from "./lessons.js";
import * as choiceFaker from "./choices.js";
import * as achievementFaker from "./achievements.js";

async function seedDatabase() {
  try {
    // Call each seeder function in the desired order
    // await userFaker.up(prisma);
    // await languageFaker.up(prisma);
    // await lessonFaker.up(prisma);
    // await questionFaker.up(prisma);
    // await choiceFaker.up(prisma);
    // await achievementFaker.up(prisma);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seedDatabase().finally(async () => {
  await prisma.$disconnect();
});
