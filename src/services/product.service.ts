import { Op, Sequelize } from 'sequelize';
import { ProductModel } from '../models/product.model';

const getAll = (): Promise<ProductModel[]> => {
  return ProductModel.findAll();
};

const getAllByCategory = (category: string): Promise<ProductModel[]> => {
  return ProductModel.findAll({
    where: {
      category,
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

const getByDiscount = (discount: number): Promise<ProductModel[]> => {
  return ProductModel.findAll({
    where: Sequelize.literal(
      `CAST("priceRegular" AS numeric) - CAST("price" AS numeric) > ${discount}`,
    ),
  });
};

export const productService = {
  getAll,
  getAllByCategory,
  getRecomended,
  getByYear,
  getByDiscount,
};
