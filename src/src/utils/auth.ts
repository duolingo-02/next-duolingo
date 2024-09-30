import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: number;
  role: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}