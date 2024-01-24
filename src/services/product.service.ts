import { injectable } from 'inversify';
import { Op, Sequelize } from 'sequelize';
import { ProductModel } from '../models/product.model';
import { IProductService } from '../interfaces/product.interface';

@injectable()
export class ProductService implements IProductService {
  getAll(): Promise<ProductModel[]> {
    return ProductModel.findAll();
  }

  findByPk(id: number): Promise<ProductModel | null> {
    return ProductModel.findOne({
      where: {
        id: id,
        categoryId: 1,
      },
    });
  }

  getAllByCategory(categoryId: number): Promise<ProductModel[]> {
    return ProductModel.findAll({
      where: {
        categoryId,
      },
    });
  }

  getRecomended(
    id: string,
    category: string,
    limit: number,
  ): Promise<ProductModel[]> {
    return ProductModel.findAll({
      where: {
        itemId: { [Op.not]: id },
        category,
      },
      order: [Sequelize.fn('RANDOM')],
      limit,
    });
  }

  getByYear(category: string, year: number): Promise<ProductModel[]> {
    return ProductModel.findAll({
      where: {
        year: year.toString(),
        category: category,
      },
    });
  }

  getByDiscount(limit: number): Promise<ProductModel[]> {
    return ProductModel.findAll({
      order: [
        [
          Sequelize.literal(
            'CAST("priceRegular" AS numeric) - CAST("price" AS numeric)',
          ),
          'DESC',
        ],
      ],
      limit,
    });
  }
}
