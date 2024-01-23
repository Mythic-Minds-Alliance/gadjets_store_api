import { injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { ISequelize } from '../interfaces/sequelize.interface';
import { models } from '../models/index';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { ColorModel } from '../models/colors.model';
import { ProductsColors } from '../models/products_colors';
import { ImageModel } from '../models/image.model';
import { CapacityModel } from '../models/capacity.model';
import { ProductsCapacities } from '../models/products_capacities.model';
import { CellModel } from '../models/cell.model';
import { ProductsCells } from '../models/products_cells.model';

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
      // models: [__dirname + '/models'],
      dialectOptions: {
        ssl: true,
      },
    });

    this.sequelize.addModels([
      CategoryModel,
      ProductModel,
      ColorModel,
      ProductsColors,
      ImageModel,
      CapacityModel,
      ProductsCapacities,
      CellModel,
      ProductsCells,
    ]);
  }
}
