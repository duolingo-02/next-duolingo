import { faker } from "@faker-js/faker";

export const up = async (prisma) => {
  const achievements = [];

  for (let i = 0; i < 10; i++) {
    achievements.push({
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      points: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.imageUrl(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await prisma.achievement.createMany({ data: achievements });
};

export const down = async (prisma) => {
  await prisma.achievement.deleteMany({});
};
