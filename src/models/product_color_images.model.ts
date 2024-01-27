/* eslint-disable */
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { ColorModel } from './colors.model';

@Table({
  tableName: 'product_color_images',
  createdAt: false,
  updatedAt: false,
})
export class ProductColorImageModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  productId: number;

  @ForeignKey(() => ColorModel)
  @Column(DataType.INTEGER)
  colorId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  imageUrl: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

  @BelongsTo(() => ColorModel, 'colorId')
  color: ColorModel;
}
