import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const prisma = new PrismaClient();
const saltRounds = 10;

interface ExtendedNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  })
});

const runMiddleware = (req: ExtendedNextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function userSignup(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await runMiddleware(req, res, upload.single('file'));

    console.log("Attempting to connect to the database...");
    await prisma.$connect();
    console.log("Database connection successful");

    const { username, email, passwordHash } = JSON.parse(req.body.data || '{}');
    const file = req.file;

    console.log("Received data:", { username, email, file: file ? 'File received' : 'No file' });

    if (!username || !email || !passwordHash) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (passwordHash.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    console.log("Checking for existing user...");
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already in use" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(passwordHash, saltRounds);
    
    let profilePicture = null;
    if (file) {
      console.log("Processing profile picture...");
      profilePicture = `/uploads/${file.filename}`;
    }

    console.log("Creating user in database...");
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        role: "user",
        profilePicture: profilePicture || "/default-avatar.png"
      },
    });

    console.log("User created successfully");
    res.status(201).json({ message: "User created successfully", user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Error in registration process:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : 'Unknown error' });
  } finally {
    await prisma.$disconnect();
  }
}