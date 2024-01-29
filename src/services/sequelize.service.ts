/* eslint-disable */
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { ISequelize } from '../interfaces/sequelize.interface';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { ColorModel } from '../models/colors.model';
import { ImageModel } from '../models/image.model';
import { CapacityModel } from '../models/capacity.model';
import { CellModel } from '../models/cell.model';
import { ProductsCells } from '../models/products_cells.model';
import { IConfigService } from '../interfaces/config.service.interface';
import { TYPES } from '../types/types';
import { ILogger } from '../interfaces/logger.interface';
import { UserModel } from '../models/user.model';
import { RoleModel, UsersRolesModel } from '../models/users.roles.model';
import { ProductsCapacitiesColorsModel } from '../models/products_capacities_colors.model';
import { ProductColorImageModel } from '../models/product_color_images.model';
import { ProductResult } from '../interfaces/productResult.interface';

@injectable()
export class SequelizeService implements ISequelize {
  sequelize: Sequelize;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: this.configService.get('DB_HOST') || process.env.DB_HOST,
      username: this.configService.get('DB_USER') || process.env.DB_USER,
      password:
        this.configService.get('DB_PASSWORD') || process.env.DB_PASSWORD,
      database: this.configService.get('DB_NAME') || process.env.DB_NAME,
      dialectOptions: {
        ssl: true,
      },
      define: {
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        },
        timestamps: false,
      },
    });

    this.sequelize.addModels([
      CategoryModel,
      ProductModel,
      ColorModel,
      ImageModel,
      CapacityModel,
      ProductsCapacitiesColorsModel,
      CellModel,
      ProductsCells,
      ProductColorImageModel,
      UserModel,
      UsersRolesModel,
      RoleModel,
    ]);

    this.logger.log('[Sequelize] Connected to db successfully');
  }

  private getSortField(
    field: string | undefined,
    categoryId: number | undefined,
  ): string {
    switch (field) {
      case 'price':
      case 'priceDiscount':
        return `productCapacitiesColorsPrices."${field}"`;

      case 'capacity':
        return this.getCapacitySortField(categoryId);

      case 'ram':
        return `CASE
                  WHEN product."${field}" LIKE '%GB' THEN CAST(SUBSTRING(product."${field}", '([0-9]+)') AS INTEGER) * 1000
                  WHEN product."${field}" LIKE '%MB' THEN CAST(SUBSTRING(product."${field}", '([0-9]+)') AS INTEGER)
                END`;

      case 'year':
        return `product."year"`;

      default:
        throw new Error(`Invalid field: ${field}`);
    }
  }

  private getCapacitySortField(categoryId: number | undefined): string {
    if (Number(categoryId) === 3) {
      return `CAST(SUBSTRING(capacity."capacity", '([0-9]+)') AS INTEGER)`;
    } else {
      return `CASE
                  WHEN capacity."capacity" LIKE '%TB' THEN CAST(SUBSTRING(capacity."capacity", '([0-9]+)') AS INTEGER) * 1000
                  WHEN capacity."capacity" LIKE '%GB' THEN CAST(SUBSTRING(capacity."capacity", '([0-9]+)') AS INTEGER)
                  WHEN capacity."capacity" LIKE '%MB' THEN CAST(SUBSTRING(capacity."capacity", '([0-9]+)') AS INTEGER) / 1000
                END`;
    }
  }

  async getProductsByProps(
    filter?: any,
    limit?: number,
    offset?: number,
    sort?: string,
    sortBy?: string,
  ): Promise<ProductResult[]> {
    let query = `
      WITH product_colors AS (
        SELECT
            product.id AS product_id,
            ARRAY_AGG(DISTINCT color.name) AS colorsAvailable
        FROM
            products product
        JOIN
            products_capacities_colors_prices productCapacitiesColorsPrices ON product.id = productCapacitiesColorsPrices."productId"
        JOIN
            colors color ON productCapacitiesColorsPrices."colorId" = color.id
        GROUP BY
            product.id
      ),
      product_cells AS (
        SELECT
            productColors."productId",
            ARRAY_AGG(cell.type) AS cells
        FROM
            products_cells productColors
        JOIN
            cells cell ON productColors."cellId" = cell.id
        GROUP BY
            productColors."productId"
      ),
      product_images AS (
        SELECT
            productColorImages."productId",
            productColorImages."colorId",
            ARRAY_AGG(DISTINCT productColorImages."imageUrl") AS images
        FROM
            product_color_images productColorImages
        GROUP BY
            productColorImages."productId", productColorImages."colorId"
      ),
      product_capacities AS (
        SELECT
            product.id AS product_id,
            ARRAY_AGG(DISTINCT capacity.capacity) AS capacitiesAvailable
        FROM
            products product
        JOIN
            products_capacities_colors_prices productCapacitiesColorsPrices ON product.id = productCapacitiesColorsPrices."productId"
        JOIN
            capacities capacity ON productCapacitiesColorsPrices."capacityId" = capacity.id
        GROUP BY
            product.id
      )
      SELECT
          product.id,
          CONCAT(product.name, ' ', capacity.capacity, ' ', CONCAT(UPPER(LEFT(color.name, 1)), SUBSTRING(color.name, 2))) AS name,
          capacity.capacity,
          color.name AS color,
          productColors.colorsAvailable,
          productCapacitiesColorsPrices."price",
          productCapacitiesColorsPrices."priceDiscount",
          product.brand,
          product."categoryId",
          product.description,
          product.resolution,
          product.screen,
          product.processor,
          product.ram,
          product.camera,
          product.zoom,
          product.year,
          productCell.cells,
          productImage.images,
          productCapacity.capacitiesAvailable
      FROM
          products product
      JOIN
          products_capacities_colors_prices productCapacitiesColorsPrices ON product.id = productCapacitiesColorsPrices."productId"
      JOIN
          capacities capacity ON productCapacitiesColorsPrices."capacityId" = capacity.id
      JOIN
          colors color ON productCapacitiesColorsPrices."colorId" = color.id
      JOIN
          product_colors productColors ON product.id = productColors.product_id
      LEFT JOIN
          product_cells productCell ON product.id = productCell."productId"
      LEFT JOIN
          product_images productImage ON product.id = productImage."productId" AND color.id = productImage."colorId"
      JOIN
          product_capacities productCapacity ON product.id = productCapacity.product_id
      WHERE
          1=1
  `;

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        query += this.buildFilterCondition(key, filter[key]);
      }
    });

    if (sortBy) {
      query += `
        ORDER BY
            ${this.getSortField(sortBy, filter.categoryId)} ${sort},
            product.id, capacity.id, color.id
      `;
    }

    query += `
  LIMIT :limit OFFSET :offset;
  `;

    const replacements = { ...filter, limit, offset };
    this.validateLimits(replacements);

    const [results] = await this.sequelize.query(query, {
      replacements,
    });

    return results as ProductResult[];
  }

  private buildFilterCondition(key: string, value: any): string {
    switch (key) {
      case 'productId':
        return ` AND product.id = :${key}`;
      case 'color':
        return ` AND color.name = :${key}`;
      case 'categoryId':
        return Array.isArray(value)
          ? ` AND product."categoryId" IN (:${key})`
          : '';
      case 'brand':
        return ` AND product.brand = :${key}`;
      case 'capacity':
        return ` AND capacity.capacity = :${key}`;
      case 'ram':
        return ` AND product.ram = :${key}`;
      case 'year':
        return ` AND product.year = :${key}`;
      default:
        throw new Error(`Invalid filter key: ${key}`);
    }
  }

  private validateLimits(replacements: any): void {
    if (!Number.isInteger(replacements.limit) || replacements.limit < 1) {
      throw new Error('Limit must be a positive integer');
    }

    if (!Number.isInteger(replacements.offset) || replacements.offset < 0) {
      throw new Error('Offset must be a non-negative integer');
    }
  }
}
