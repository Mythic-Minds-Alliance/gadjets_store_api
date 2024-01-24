import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { ProductService } from '../services/product.service';
import { IPhoneController } from '../interfaces/phone.controller.interface';
import { HTTPError } from '../errors/http-error.class';
import { ExpressReturnType } from '../interfaces/route.interface';

const CATEGORY_PHONES = 1;

@injectable()
export class PhoneController
  extends BaseController
  implements IPhoneController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ProductService) private productService: ProductService,
  ) {
    super(loggerService);
    this.bindRoutes([{ path: '/phones', method: 'get', func: this.getAll }]);
    this.bindRoutes([
      { path: '/phones/:id', method: 'get', func: this.getById },
    ]);
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    try {
      const phones =
        await this.productService.getAllByCategory(CATEGORY_PHONES);

      return res.send(phones);
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    const { id } = req.params;

    try {
      const phone = await this.productService.findByPk(Number(id));

      if (!phone) {
        next(new HTTPError(404, 'Cannot find Phone with this ID'));

        return;
      }

      return res.send(phone);
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
    }
  }
}
