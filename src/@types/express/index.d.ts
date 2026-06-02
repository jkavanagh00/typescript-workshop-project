declare namespace Express {
  interface Request {
    user?: import('jsonwebtoken').JwtPayload & { id: number };
  }
}
