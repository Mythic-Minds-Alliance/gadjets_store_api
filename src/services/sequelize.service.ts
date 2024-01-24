import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';
import { ISequelize } from '../interfaces/sequelize.interface';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { ColorModel } from '../models/colors.model';
import { ProductsColors } from '../models/products_colors';
import { ImageModel } from '../models/image.model';
import { CapacityModel } from '../models/capacity.model';
import { ProductsCapacities } from '../models/products_capacities.model';
import { CellModel } from '../models/cell.model';
import { ProductsCells } from '../models/products_cells.model';
import { IConfigService } from '../interfaces/config.service.interface';
import { TYPES } from '../types/types';
import { ILogger } from '../interfaces/logger.interface';

@injectable()
export class SequelizeService implements ISequelize {
  sequelize: Sequelize;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: this.configService.get('DB_HOST'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      // host: process.env.DB_HOST,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
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

    this.logger.log('[Sequelize] Connected to db successfully');
  }
}
