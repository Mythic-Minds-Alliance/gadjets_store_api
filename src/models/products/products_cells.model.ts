/* eslint-disable */
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { CellModel } from '../productDetails/cell.model';

@Table({
  tableName: 'products_cells',
  createdAt: false,
  updatedAt: false,
})
export class ProductsCells extends Model {
  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  productId!: number;

  @ForeignKey(() => CellModel)
  @Column(DataType.INTEGER)
  cellId!: number;
}
