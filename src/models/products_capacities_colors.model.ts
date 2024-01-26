/* eslint-disable */
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ColorModel } from './colors.model';
import { CapacityModel } from './capacity.model';
import { ProductModel } from './product.model';

@Table({
  tableName: 'products_capacities_colors_prices',
  createdAt: false,
  updatedAt: false,
})
export class ProductsCapacitiesColorsModel extends Model {

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
    productId: number;

  @ForeignKey(() => CapacityModel)
  @Column(DataType.INTEGER)
    capacityId: number;

  @ForeignKey(() => ColorModel)
  @Column(DataType.INTEGER)
    colorId: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
    price: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
    priceDiscount: number;

  @BelongsTo(() => ProductModel)
    product: ProductModel;

  @BelongsTo(() => CapacityModel)
    capacity: CapacityModel;

  @BelongsTo(() => ColorModel)
    color: ColorModel;
}
