import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
export const generateToken = payload => {
  // @ts-ignore - JWT_EXPIRES_IN is a valid string value for expiresIn
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};
export const verifyToken = token => {
  return jwt.verify(token, JWT_SECRET);
};