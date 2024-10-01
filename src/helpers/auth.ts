import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
interface Decoded {
  id: number;
}
export interface ExtendedNextApiRequest extends NextApiRequest {
  user: {
    id: number;
  };
}
const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      (req as any).user = decoded; // Attach the decoded token to the request object
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default authMiddleware;
