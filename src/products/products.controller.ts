import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';
import 'reflect-metadata';
import { getProductsOnPage } from '../data/products';
import { Product } from '../types/product';
import { IProductController } from './products.controller.interface';
import { ExpressReturnType } from '../common/route.interface';
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
      // const pageNumber: number = parseInt(req.query.page as string)  1;
      // const pageSize: number = parseInt(req.query.size as string)  10;
      // const startIndex = (pageNumber - 1) * pageSize;
      // const endIndex = startIndex + pageSize;
      const productsAll = await ProductModel.findAll();

      // return res.send(productsAll.slice(startIndex, endIndex));
      return res.send(productsAll);
    } catch (error) {
      // next(new HTTPError(500, 'Error fetching products'));
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
