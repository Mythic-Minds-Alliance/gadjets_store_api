/* eslint-disable indent */
/* eslint-disable quotes */
import { injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { ISequelize } from './sequelize.interface';
import { models } from '../../models/index';
import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';
import { ColorModel } from '../../models/colors.model';
import { ImageModel } from '../../models/image.model';
import { CapacityModel } from '../../models/capacity.model';
import { CellModel } from '../../models/cell.model';
import { ProductsCells } from '../../models/products_cells.model';
import { ProductsCapacitiesColorsModel } from '../../models/products_capacities_colors.model';
import { ProductColorImageModel } from '../../models/product_color_images.model';
import { QueryTypes } from 'sequelize';

@injectable()
export class SequelizeService implements ISequelize {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
    ]);
  }

  async getProductsByProps(
    this: any,
    filter?: any,
    limit?: number,
    offset?: number,
    sort?: string,
    sortBy?: string,
  ) {
    let query = `
      WITH product_colors AS (
        SELECT
            p.id AS product_id,
            ARRAY_AGG(DISTINCT cl.name) AS colorsAvailable
        FROM
            products p
        JOIN
            products_capacities_colors_prices pccp ON p.id = pccp."productId"
        JOIN
            colors cl ON pccp."colorId" = cl.id
        GROUP BY
            p.id
      ),
      product_cells AS (
        SELECT
            pc."productId",
            ARRAY_AGG(c.type) AS cells
        FROM
            products_cells pc
        JOIN
            cells c ON pc."cellId" = c.id
        GROUP BY
            pc."productId"
      ),
      product_images AS (
        SELECT
            pci."productId",
            pci."colorId",
            ARRAY_AGG(DISTINCT pci."imageUrl") AS images
        FROM
            product_color_images pci
        GROUP BY
            pci."productId", pci."colorId"
      ),
      product_capacities AS (
        SELECT
            p.id AS product_id,
            ARRAY_AGG(DISTINCT c.capacity) AS capacitiesAvailable
        FROM
            products p
        JOIN
            products_capacities_colors_prices pccp ON p.id = pccp."productId"
        JOIN
            capacities c ON pccp."capacityId" = c.id
        GROUP BY
            p.id
      )
      SELECT
          p.id,
          CONCAT(p.name, ' ', c.capacity, ' ', CONCAT(UPPER(LEFT(cl.name, 1)), SUBSTRING(cl.name, 2))) AS name,
          c.capacity,
          cl.name AS color,
          pc.colorsAvailable,
          pccp."price",
          pccp."priceDiscount",
          p.brand,
          p."categoryId",
          p.description,
          p.resolution,
          p.screen,
          p.processor,
          p.ram,
          p.camera,
          p.zoom,
          p.year,
          pcl.cells,
          pi.images,
          pcp.capacitiesAvailable
      FROM
          products p
      JOIN
          products_capacities_colors_prices pccp ON p.id = pccp."productId"
      JOIN
          capacities c ON pccp."capacityId" = c.id
      JOIN
          colors cl ON pccp."colorId" = cl.id
      JOIN
          product_colors pc ON p.id = pc.product_id
      LEFT JOIN
          product_cells pcl ON p.id = pcl."productId"
      LEFT JOIN
          product_images pi ON p.id = pi."productId" AND cl.id = pi."colorId"
      JOIN
          product_capacities pcp ON p.id = pcp.product_id
      WHERE
          1=1
  `;

    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        if (key === 'productId') {
          query += ` AND p.id = :${key}`;
        } else if (key === 'color') {
          query += ` AND cl.name = :${key}`;
        } else if (key === 'categoryId') {
          if (Array.isArray(filter[key])) {
            query += ` AND p."categoryId" IN (:${key})`;
          }
        } else if (key === 'brand') {
          query += ` AND p.brand = :${key}`;
        } else if (key === 'capacity') {
          query += ` AND c.capacity = :${key}`;
        } else if (key === 'ram') {
          query += ` AND p.ram = :${key}`;
        } else if (key === 'year') {
          query += ` AND p.year = :${key}`;
        }
      }
    });

    if (sortBy) {
      query += `
        ORDER BY
            ${getSortField(sortBy)} ${sort},
            p.id, c.id, cl.id
      `;
    }

    query += `
  LIMIT :limit OFFSET :offset;
  `;

    const replacements = { ...filter, limit, offset };
    if (!Number.isInteger(limit) || Number(limit) < 1) {
      throw new Error('Limit must be a positive integer');
    }
    if (!Number.isInteger(offset) || Number(offset) < 0) {
      throw new Error('Offset must be a non-negative integer');
    }

    const [results] = await this.sequelize.query(query, {
      replacements,
    });

    return results;
  }
}

function getSortField(field?: string) {
  switch (field) {
    case 'price':
    case 'priceDiscount':
      return `pccp."${field}"`;
    case 'capacity':
      return `CAST(SUBSTRING(c."${field}", '([0-9]+)') AS INTEGER)`;
    case 'ram':
      return `CAST(SUBSTRING(p."${field}", '([0-9]+)') AS INTEGER)`;
    case 'year':
      return `p."year"`;
  }
}
