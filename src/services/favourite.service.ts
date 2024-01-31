import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/common/logger.interface';
import { SequelizeService } from './sequelize.service';
import { TYPES } from '../types/types';
import { FavouriteModel } from '../models/favourites/favourites.model';
import { Filter } from '../types/filter.type';
import { IFavouriteService } from '../interfaces/favourites/favoutire.service.interface';
import { ProductResult } from '../interfaces/products/productResult.interface';

@injectable()
export class FavouriteService implements IFavouriteService {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
  ) {}

  async getAllFavourites(userId: number): Promise<FavouriteModel[]> {
    return FavouriteModel.findAll({ where: { userId } });
  }

  async addToFavourites(
    userId: number,
    productId: number,
    color: string,
    capacity: string,
  ): Promise<void> {
    const filter: Filter = {
      productId: productId,
      color: color,
      capacity: capacity,
    };

    try {
      const product = await this.sequelizeService.getProductsByProps(
        filter,
        1,
        0,
      );

      if (!product || product.length === 0) {
        throw new Error('No product found with the given parameters.');
      }

      const existingFavourite = await FavouriteModel.findOne({
        where: {
          userId,
          productId: product[0].id,
          color: color,
          capacity: capacity,
        },
      });

      if (existingFavourite) {
        throw new Error('Product already added to favourites.');
      }

      await FavouriteModel.create({
        userId,
        productId: product[0].id,
        color: color,
        capacity: capacity,
      });
    } catch (err) {
      throw new Error('Product was not found!');
    }
  }

  async getUniqueProduct(filter: Filter): Promise<ProductResult> {
    try {
      const product = await this.sequelizeService.getProductsByProps(
        filter,
        1,
        0,
      );

      if (!product || product.length === 0) {
        throw new Error('No product found with the given parameters.');
      }

      return product[0];
    } catch (err) {
      throw new Error('Product was not found!');
    }
  }

  async deleteFavourite(favId: number): Promise<void> {
    const favItem = await FavouriteModel.findByPk(favId);

    if (!favItem) {
      throw new Error('Product not found in favourite.');
    }

    await favItem.destroy();
  }
}
