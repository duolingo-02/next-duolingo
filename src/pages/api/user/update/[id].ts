import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { verifyToken } from "../../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.userId !== Number(id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this user" });
    }

    const { username, email, profilePicture } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username: username || undefined,
        email: email || undefined,
        profilePicture: profilePicture || undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profilePicture: true,
        totalPoints: true,
      },
    });

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user information" });
  }
}
