import { Request, Response, NextFunction } from 'express';

export interface IProductController {
  getProducts: (req: Request, res: Response, next: NextFunction) => void;
}
