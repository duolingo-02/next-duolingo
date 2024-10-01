import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const up = async (prisma) => {
  const users = [];

  // Specific test users
  const testUsers = [
    {
      username: "testUser",
      email: "testUser@email.com",
      passwordHash: await hashPassword("1234"),
      profilePicture: faker.image.avatar(),
      totalPoints: faker.number.int({ min: 0, max: 15000 }), // Use .int() for integer
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "testAdmin",
      email: "testAdmin@email.com",
      passwordHash: await hashPassword("1234"),
      profilePicture: faker.image.avatar(),
      totalPoints: faker.number.int({ min: 0, max: 1500 }), // Use .int() for integer
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "testTeacher",
      email: "testTeacher@email.com",
      passwordHash: await hashPassword("1234"),
      profilePicture: faker.image.avatar(),
      totalPoints: faker.number.int({ min: 0, max: 1500 }), // Use .int() for integer
      role: "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Add specific test users to the array
  users.push(...testUsers);

  // Generate random users
  for (let i = 0; i < 17; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: await hashPassword("1234"),
      profilePicture: faker.image.avatar(),
      totalPoints: faker.number.int({ min: 0, max: 1500 }), // Use .int() for integer
      role: faker.helpers.arrayElement(["user", "admin", "teacher"]),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await prisma.user.createMany({ data: users });
};

export const down = async (prisma) => {
  await prisma.user.deleteMany({});
};
