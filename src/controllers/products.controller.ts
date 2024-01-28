import 'reflect-metadata';
import { TYPES } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controllers/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { IProductController } from '../interfaces/products.controller.interface';
import { ExpressReturnType } from '../interfaces/route.interface';
import { IConfigService } from '../interfaces/config.service.interface';
import { ISequelize } from '../interfaces/sequelize.interface';

interface Filter {
  productId?: number;
  categoryId?: number[];
  color?: string;
  capacity?: string;
  brand?: string;
  ram?: string;
  year?: number;
}

@injectable()
export class ProductController
  extends BaseController
  implements IProductController
{
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.SequelizeService) private sequalizeService: ISequelize,
    @inject(TYPES.ILogger) private loggerService: ILogger,
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: '/products', method: 'get', func: this.getProductsByProps },
    ]);
  }

  private readonly validFields = [
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

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: Retrieve a list of products
   *     description: Retrieve a list of products. Can be used to populate a list of fake products when prototyping or testing an API.
   *     parameters:
   *       - in: query
   *         name: productId
   *         schema:
   *           type: integer
   *         description: The product ID.
   *       - in: query
   *         name: categoryId
   *         schema:
   *           type: integer
   *         description: The category ID.
   *       - in: query
   *         name: color
   *         schema:
   *           type: string
   *         description: The color of the product, look into the /colors request for all colors
   *       - in: query
   *         name: capacity
   *         schema:
   *           type: string
   *         description: The capacity of the product, look into the /capacities request for all capacities. Capacity needs categoryId to work!
   *       - in: query
   *         name: brand
   *         schema:
   *           type: string
   *         description: The brand of the product.
   *       - in: query
   *         name: ram
   *         schema:
   *           type: string
   *         description: The RAM of the product.
   *       - in: query
   *         name: year
   *         schema:
   *           type: integer
   *         description: The year of the product.
   *       - in: query
   *         name: sort
   *         description: |
   *            The sort order. Sort order can not exist without sortBy query param!
   *            Possible sort orders: ASC or DESC. Default sort=ASC
   *         schema:
   *            type: string
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *         description: |
   *            The field to sort by. Possible sortBy orders: price, priceDiscount, capacity, ram and year!
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: The number of records to return.
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *         description: The number of records to skip for pagination.
   *     responses:
   *       200:
   *         description: A list of products.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: 'product.model.ts'
   */
  private validateSort(sort: unknown): string {
    if (typeof sort !== 'string' || (sort !== 'ASC' && sort !== 'DESC')) {
      throw new Error(
        'Parameter "sort" should be a string with value "ASC" or "DESC".',
      );
    }
    return sort;
  }

  private validateSortBy(sortBy: unknown): string | undefined {
    if (typeof sortBy === 'string' && sortBy.trim()) {
      return sortBy;
    }
    return undefined;
  }

  private validateCategoryId(sortBy: string, filter: Filter): void {
    if (sortBy === 'capacity' && !filter.categoryId) {
      throw new Error('CategoryId is required when sorting by capacity.');
    }
  }

  private validateQueryParameters(query: Record<string, unknown>): void {
    Object.keys(query).forEach((key) => {
      if (!this.validFields.includes(key)) {
        throw new Error(`Invalid query parameter: ${key}`);
      }
    });
  }

  private parseCategoryId(categoryId: unknown): number[] | undefined {
    if (!categoryId) return undefined;

    if (typeof categoryId === 'string') {
      return categoryId.split(',').map(Number);
    } else if (Array.isArray(categoryId)) {
      return categoryId.map(Number);
    }

    return undefined;
  }

  async getProductsByProps(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
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
        limit = '100',
        offset = '0',
      } = req.query;

      const filter: Filter = {
        productId: productId ? +productId : undefined,
        categoryId: this.parseCategoryId(categoryId),
        color: color as string,
        capacity: capacity as string,
        brand: brand as string,
        ram: ram as string,
        year: year ? +year : undefined,
      };

      this.validateQueryParameters(req.query);
      const validatedSort = this.validateSort(sort);
      const validatedSortBy = this.validateSortBy(sortBy);

      if (validatedSortBy !== undefined) {
        this.validateCategoryId(validatedSortBy, filter);
      }

      const product = await this.sequalizeService.getProductsByProps(
        filter,
        +limit,
        +offset,
        validatedSort,
        validatedSortBy,
      );

      if (!product) {
        throw new Error('No products found with the given parameters.');
      }

      res.json(product);
    } catch (err) {
      next(err);
    }
  }
}
