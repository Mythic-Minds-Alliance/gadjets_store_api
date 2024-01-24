import { Op, Sequelize } from 'sequelize';
import { ProductModel } from '../models/product.model';

const getAll = (): Promise<ProductModel[]> => {
  return ProductModel.findAll();
};

const getAllByCategory = (categoryId: number): Promise<ProductModel[]> => {
  return ProductModel.findAll({
    where: {
      categoryId,
    },
  });
};

const getRecomended = (
  id: string,
  category: string,
  limit: number,
): Promise<ProductModel[]> => {
  return ProductModel.findAll({
    where: {
      itemId: { [Op.not]: id },
      category,
    },
    order: [Sequelize.fn('RANDOM')],
    limit,
  });
};

const getByYear = (category: string, year: number): Promise<ProductModel[]> => {
  return ProductModel.findAll({
    where: {
      year: year.toString(),
      category: category,
    },
  });
};

const getByDiscount = (limit: number): Promise<ProductModel[]> => {
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
};

export const productService = {
  getAll,
  getAllByCategory,
  getRecomended,
  getByYear,
  getByDiscount,
};
