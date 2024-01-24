import { Request, Response, NextFunction } from 'express';
import { ExpressReturnType } from './route.interface';

export interface IPhoneController {
  getAll: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ExpressReturnType | undefined>;
}
