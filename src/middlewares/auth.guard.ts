import { IMiddleware } from '../interfaces/middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

export class AuthGuard implements IMiddleware {
  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const decoded = verify(req.user, 'MMA');

      if (typeof decoded === 'object' && 'id' in decoded) {
        const userId = (decoded as JwtPayload).id;
      } else {
        res.status(500).send({ error: 'JWT does not contain id' });
      }
    } catch (error) {
      res.status(500).send({ 'Error decoding JWT:': error });
    }
  }
}
