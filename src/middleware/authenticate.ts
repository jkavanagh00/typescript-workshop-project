import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type AuthTokenPayload = {
  id: number;
};

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof (value as { id: unknown }).id === 'number'
  );
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!isAuthTokenPayload(decoded)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}