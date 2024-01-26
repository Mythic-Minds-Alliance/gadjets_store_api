import { Request, Response, NextFunction } from 'express';
import { ExpressReturnType } from '../common/route.interface';

export interface IProductController {
  getProductsByProps: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ExpressReturnType | undefined>;
}
