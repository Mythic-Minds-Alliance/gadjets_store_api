import { Request, Response, NextFunction, Router } from 'express';

export interface IControllerRoute {
  // route: string;
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}
