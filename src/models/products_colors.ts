/* eslint-disable */
import {
  Table,
  Column,
  Model,
  AutoIncrement,
  DataType,
  AllowNull,
  PrimaryKey,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { ColorModel } from './colors.model';

@Table({
  tableName: 'products_colors',
  createdAt: false,
  updatedAt: false,
})
export class ProductsColors extends Model {
  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  productId!: number;

  @ForeignKey(() => ColorModel)
  @Column(DataType.INTEGER)
  colorId!: number;
}
