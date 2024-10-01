import { faker } from "@faker-js/faker";

export const up = async (prisma) => {
  const lessons = [];

  for (let i = 0; i < 10; i++) {
    lessons.push({
      title: faker.lorem.words(3),
      type: faker.helpers.arrayElement(['MULTIPLE', 'ORDER', 'TRUE_FALSE']), // Ensure this matches your enum
      question: faker.lorem.sentence(),
      options: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      answer: faker.lorem.word(),
      points: faker.number.int({ min: 100, max: 500 }),
      languageId: faker.number.int({ min: 1, max: 3 }), // Adjust based on existing language IDs
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await prisma.lesson.createMany({ data: lessons });
};

export const down = async (prisma) => {
  await prisma.lesson.deleteMany({});
};
