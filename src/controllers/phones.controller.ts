import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from './base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { productService } from '../services/product.service';
import { IPhoneController } from '../interfaces/phone.controller.interface';
import { HTTPError } from '../errors/http-error.class';
import { ExpressReturnType } from '../interfaces/route.interface';

const CATEGORY_PHONES = 1;

@injectable()
export class PhoneController
  extends BaseController
  implements IPhoneController
{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([{ path: '/phones', method: 'get', func: this.getAll }]);
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    try {
      const phones = await productService.getAllByCategory(CATEGORY_PHONES);

      return res.send(phones);
    } catch (error: string | any) {
      next(new HTTPError(500, 'Error fetching products', error.message));
    }
  }
}
