import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from "../../../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const userId = decoded.userId;

    const { pointsToAdd } = req.body;

    if (typeof pointsToAdd !== 'number' || pointsToAdd <= 0) {
      return res.status(400).json({ message: 'Invalid points value' });
    }

    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        totalPoints: {
          increment: pointsToAdd
        }
      }
    });

    return res.status(200).json({ totalPoints: user.totalPoints });
  } catch (error) {
    console.error('Error updating points:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Error updating points' });
  }
}