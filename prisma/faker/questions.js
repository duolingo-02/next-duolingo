import { faker } from "@faker-js/faker";

export const up = async (prisma) => {
  const lessons = await prisma.lesson.findMany(); // Fetch existing lessons
  const lessonIds = lessons.map(lesson => lesson.id); // Extract lesson IDs

  const questions = [];

  for (let i = 0; i < 50; i++) {
    questions.push({
      questionText: faker.lorem.sentence(),
      lessonId: faker.helpers.arrayElement(lessonIds), // Use existing lesson IDs
      type: faker.helpers.arrayElement(['MULTIPLE_CHOICE', 'ORDERING', 'TRUE_FALSE']),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await prisma.question.createMany({ data: questions });
};

export const down = async (prisma) => {
  await prisma.question.deleteMany({});
};
