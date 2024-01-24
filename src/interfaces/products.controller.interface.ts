import { Request, Response, NextFunction } from 'express';
import { ExpressReturnType } from './route.interface';

export interface IProductController {
  getProducts: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ExpressReturnType | undefined>;

  getDiscount: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ExpressReturnType | undefined>;
}
