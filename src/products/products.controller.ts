import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types/types';
import 'reflect-metadata';
import { IProductController } from './products.controller.interface';
import { ExpressReturnType } from '../common/route.interface';
import { ProductModel } from '../models/product.model';
import { ColorModel } from '../models/colors.model';
import { CapacityModel } from '../models/capacity.model';
import { CellModel } from '../models/cell.model';
import { ProductsCells } from '../models/products_cells.model';
import { ProductsCapacitiesColorsModel } from '../models/products_capacities_colors.model';
import { ProductColorImageModel } from '../models/product_color_images.model';
import { IsArray, Sequelize } from 'sequelize-typescript';
import { Model } from 'sequelize';
import { SequelizeService } from '../services/sequelize/sequelize.service';

@injectable()
export class ProductController
  extends BaseController
  implements IProductController
{
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/products', method: 'get', func: this.getProductsByProps },
    ]);
  }

  async getProductsByProps(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ExpressReturnType | undefined> {
    try {
      const validFields = [
        'productId',
        'categoryId',
        'color',
        'capacity',
        'brand',
        'ram',
        'year',
        'sort',
        'sortBy',
        'limit',
        'offset',
      ];

      const {
        productId,
        categoryId,
        color,
        capacity,
        brand,
        ram,
        year,
        sort = 'ASC',
        sortBy = '',
        limit = 100,
        offset = 0,
      } = req.query;
      const sequelizeService = new SequelizeService();

      Object.keys(req.query).forEach((key) => {
        if (!validFields.includes(key)) {
          throw new Error(`Invalid query parameter: ${key}`);
        }
      });

      const filter: any = {};
      if (productId) filter.productId = +productId;
      if (color) filter.color = color;
      if (capacity) filter.capacity = capacity;
      if (brand) filter.brand = brand;
      if (ram) filter.ram = ram;
      if (year) filter.year = +year;
      if (categoryId) {
        if (typeof categoryId === 'string') {
          filter.categoryId = categoryId.split(',').map(Number);
        } else if (Array.isArray(categoryId)) {
          filter.categoryId = categoryId.map(Number);
        }
      }
      if (typeof sort !== 'string') {
        throw new Error(
          'parameter sort should be string with value ASC or DESC!',
        );
      }

      if (typeof sortBy !== 'string') {
        throw new Error(
          'parameter sortBy should be string and property should exist!',
        );
      }

      const product = await sequelizeService.getProductsByProps(
        filter,
        Number(limit),
        Number(offset),
        sort,
        sortBy,
      );

      if (product.length === 0) {
        throw new Error(
          'Yoi! you made a mistake in your query parameter or parameters! Take a better look into your model!',
        );
      }

      return res.json(product);
    } catch (err) {
      next(err);
    }
  }
}
