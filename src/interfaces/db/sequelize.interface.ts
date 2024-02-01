import { Sequelize } from 'sequelize-typescript';
import { ExpressReturnType } from '../common/route.interface';
import { ProductResult } from '../products/productResult.interface';

export interface ISequelize {
  sequelize: Sequelize;

  getProductsByProps: (
    this: any,
    filter?: any,
    limit?: number,
    offset?: number,
    sort?: string,
    sortBy?: string,
  ) => Promise<ProductResult[]>;
}
