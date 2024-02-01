import { Request, Response, NextFunction } from 'express';

export interface IFavouritesController {
  addToFavourites(req: Request, res: Response): Promise<void>;
  removeFromFavourites(req: Request, res: Response): Promise<void>;
  getFavourites(req: Request, res: Response): Promise<void>;
}
