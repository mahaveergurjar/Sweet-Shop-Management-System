import { verifyToken } from '../utils/jwt.js';
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Authentication required'
      });
      return;
    }
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
};
export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({
      error: 'Admin access required'
    });
    return;
  }
  next();
};