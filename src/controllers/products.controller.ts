import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { IProductController } from '../interfaces/products.controller.interface';
import { ExpressReturnType } from '../interfaces/route.interface';
import { HTTPError } from '../errors/http-error.class';
import { ProductService } from '../services/product.service';

@injectable()
export class ProductController
  extends BaseController
  implements IProductController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ProductService) private productService: ProductService,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: '/products', method: 'get', func: this.getProducts },
      { path: '/products/discount', method: 'get', func: this.getDiscount },
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
      const productsAll = await this.productService.getAll();

      return res.send(productsAll.slice(startIndex, endIndex));
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
    }
  }

  async getDiscount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    try {
      const LIMIT = 24;
      const discountedProducts = await this.productService.getByDiscount(LIMIT);

      return res.send(discountedProducts);
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
    }
  }
}
