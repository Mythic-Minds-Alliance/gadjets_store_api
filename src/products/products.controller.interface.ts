import { Request, Response, NextFunction } from 'express';
import { ExpressReturnType } from '../interfaces/route.interface';

export interface IProductController {
  getProducts: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ExpressReturnType | undefined>;
}
