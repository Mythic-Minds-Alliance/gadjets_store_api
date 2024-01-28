import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
