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

  getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): ExpressReturnType {
    const pageNumber: number = parseInt(req.query.page as string) || 1;
    const pageSize: number = parseInt(req.query.size as string) || 10;

    const productsOnPage: Product[] = getProductsOnPage(pageNumber, pageSize);
    return res.send(productsOnPage);
  }
}
