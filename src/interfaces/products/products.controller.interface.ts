import { Request, Response, NextFunction } from 'express';

export interface IProductController {
  getProductsByProps: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
