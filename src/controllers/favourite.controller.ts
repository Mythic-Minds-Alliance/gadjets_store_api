import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from './base.controller';
import { ILogger } from '../interfaces/common/logger.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { IFavouriteService } from '../interfaces/favourites/favoutire.service.interface';
import jwt from 'jsonwebtoken';
import { IFavouritesController } from '../interfaces/favourites/favourite.controller.interface';

@injectable()
export class FavouritesController
  extends BaseController
  implements IFavouritesController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.FavouriteService)
    private favouritesService: IFavouriteService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/addToFavourites',
        method: 'post',
        func: this.addToFavourites,
      },
      {
        path: '/getFavourites',
        method: 'get',
        func: this.getFavourites,
      },
      {
        path: '/removeFromFavourites/:id',
        method: 'delete',
        func: this.removeFromFavourites,
      },
    ]);
  }

  async addToFavourites(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);
      const { productId, color, capacity } = req.body;

      await this.favouritesService.addToFavourites(
        userId,
        productId,
        color,
        capacity,
      );

      res.json({ message: 'Added to favourites!' });
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeFromFavourites(req: Request, res: Response): Promise<void> {
    try {
      const favId = Number(req.params.id);
      await this.favouritesService.deleteFavourite(favId);
      res.status(200).send({ message: 'Favourite deleted successfully.' });
    } catch (error) {
      console.error('Error in removeFromFavourites:', error);
      res
        .status(500)
        .send({ error: 'An error occurred while deleting the fav item.' });
    }
  }

  async getFavourites(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);

      const favourites = await this.favouritesService.getAllFavourites(userId);

      if (!favourites) {
        res.status(404).json({ error: 'Favourites not found' });
        return;
      }

      res.status(200).json(favourites);
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  private getUserIdFromToken(req: Request): number {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authorization token not provided');
    }

    const decodedToken: any = jwt.verify(
      token,
      this.configService.get('SECRET'),
    );

    console.log(decodedToken);

    return decodedToken.id;
  }
}
