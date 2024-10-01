import { faker } from "@faker-js/faker";

export const up = async (prisma) => {
  const choices = [];

  for (let i = 0; i < 50; i++) {
    choices.push({
      text: faker.lorem.words(3),
      isCorrect: faker.datatype.boolean(),
      questionId: faker.datatype.number({ min: 1, max: 50 }), // Updated to use faker.datatype
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await prisma.choice.createMany({ data: choices });
};

export const down = async (prisma) => {
  await prisma.choice.deleteMany({});
};
