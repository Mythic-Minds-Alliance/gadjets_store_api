import 'reflect-metadata';
import { TYPES } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../controllers/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/common/logger.interface';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { ISequelize } from '../interfaces/db/sequelize.interface';
import { Filter } from '../types/filter.type';
import { validationResult } from 'express-validator';
import { IProductController } from '../interfaces/products/products.controller.interface';

type SortOrder = 'ASC' | 'DESC';
type QueryParameter =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[];
type CategoryId = number[] | undefined;

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
      { path: '/', method: 'get', func: this.getProductsByProps },
      {
        path: '/recommended',
        method: 'get',
        func: this.getRecommendedProducts,
      },
      {
        path: '/hotPrices',
        method: 'get',
        func: this.getProductsHotPrices,
      },
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
    'screen',
    'sort',
    'sortBy',
    'limit',
    'offset',
    'hotPrices',
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
   *            The field to sort by. Possible sortBy orders: price, priceActual, capacity, ram and year!
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
  private validateSort(sort: SortOrder): SortOrder {
    if (sort !== 'ASC' && sort !== 'DESC') {
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
  }

  private validateCategoryId(sortBy: string, filter: Filter): void {
    if (sortBy === 'capacity' && !filter.categoryId) {
      throw new Error('CategoryId is required when sorting by capacity.');
    }
  }

  private validateQueryParameters(query: Record<string, QueryParameter>): void {
    Object.keys(query).forEach((key) => {
      if (!this.validFields.includes(key)) {
        throw new Error(`Invalid query parameter: ${key}`);
      }
    });
  }

  private parseCategoryId(categoryId: QueryParameter): CategoryId {
    if (!categoryId) return undefined;

    if (typeof categoryId === 'string') {
      return categoryId.split(',').map(Number);
    } else if (Array.isArray(categoryId)) {
      return categoryId.map(Number);
    }
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
        screen,
        sort = 'ASC',
        sortBy = '',
        limit = 1000,
        offset = '0',
      } = req.query;

      const filter: Filter = {
        productId: productId ? +productId : undefined,
        categoryId: this.parseCategoryId(categoryId as QueryParameter),
        color: color as string,
        capacity: capacity as string,
        brand: brand as string,
        screen: screen as string,
        ram: ram as string,
        year: year ? +year : undefined,
      };

      this.validateQueryParameters(req.query as Record<string, QueryParameter>);
      const validatedSort = this.validateSort(sort as SortOrder);
      const validatedSortBy = this.validateSortBy(sortBy);

      if (validatedSortBy !== undefined) {
        this.validateCategoryId(validatedSortBy, filter);
      }

      const products = await this.sequalizeService.getProductsByProps(
        filter,
        +limit,
        +offset,
        validatedSort,
        validatedSortBy,
      );

      console.log(products.length);

      if (!products) {
        throw new Error('No products found with the given parameters.');
      }

      const fix = products.map((product) => {
        const fixedPrice =
          Number(product.priceActual) === 0
            ? Number(product.price)
            : Number(product.priceActual);

        return { ...product, priceActual: String(fixedPrice) };
      });

      res.json(fix);
    } catch (err) {
      next(err);
    }
  }

  async getRecommendedProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const { categoryId } = req.query;

      const filter: Filter = {
        categoryId: this.parseCategoryId(categoryId as QueryParameter),
      };

      const limit = 1000;
      const offset = 0;

      const products = await this.sequalizeService.getProductsByProps(
        filter,
        limit,
        offset,
      );

      if (!products || products.length === 0) {
        throw new Error('No products found.');
      }

      const recommendedProducts = products.filter((product) => {
        const discount = product.price - product.priceActual;
        return product.priceActual > 0 && discount > 30 && discount <= 60;
      });

      if (!recommendedProducts || recommendedProducts.length === 0) {
        throw new Error('No recommended products found.');
      }

      res.json(recommendedProducts);
    } catch (err) {
      next(err);
    }
  }

  async getProductsHotPrices(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const limit = 10000;
      const offset = 0;

      const products = await this.sequalizeService.getProductsByProps(
        {},
        limit,
        offset,
      );

      if (!products || products.length === 0) {
        throw new Error('No products found.');
      }

      const hotPriceProducts = products.filter((product) => {
        const discount = product.price - product.priceActual;
        return product.priceActual > 0 && discount > 65;
      });

      if (!hotPriceProducts || hotPriceProducts.length === 0) {
        throw new Error('No products with hot prices found.');
      }

      res.json(hotPriceProducts);
    } catch (err) {
      next(err);
    }
  }
}
