import { ProductModel } from '../../models/products/product.model';

export interface IProductService {
  getAll: () => Promise<ProductModel[]>;
  findByPk(id: number): Promise<ProductModel | null>;
  getAllByCategory: (categoryId: number) => Promise<ProductModel[]>;
  getRecomended: (
    id: string,
    category: string,
    limit: number,
  ) => Promise<ProductModel[]>;
  getByYear: (category: string, year: number) => Promise<ProductModel[]>;
  getByDiscount: (limit: number) => Promise<ProductModel[]>;
}
