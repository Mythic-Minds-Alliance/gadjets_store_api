import { Request, Response, NextFunction } from 'express';
import { ExpressReturnType } from './route.interface';

export interface IProductController {
  getProductsByProps: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
