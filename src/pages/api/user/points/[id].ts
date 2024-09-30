import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { verifyToken } from "../../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { totalPoints: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ totalPoints: user.totalPoints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user points" });
  }
}
