import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/users.roles.model';

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  info: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
