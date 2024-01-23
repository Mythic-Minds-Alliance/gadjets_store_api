import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controllers/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import 'reflect-metadata';
import { IProductController } from './products.controller.interface';
import { ExpressReturnType } from '../interfaces/route.interface';
import { ProductModel } from '../models/product.model';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class ProductController
  extends BaseController
  implements IProductController
{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/products', method: 'get', func: this.getProducts },
    ]);
  }

  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    try {
      const pageNumber: number = parseInt(req.query.page as string) || 1;
      const pageSize: number = parseInt(req.query.size as string) || 10;
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const productsAll = await ProductModel.findAll();

      return res.send(productsAll.slice(startIndex, endIndex));
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
      // console.error('Error fetching products:', error);
      // res.status(500).send('Internal Server Error');
    }
  }
}
