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
  BelongsToMany,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { ColorModel } from './colors.model';
import { ProductsCapacitiesColorsModel } from './products_capacities_colors.model';

@Table({
  tableName: 'capacities',
  createdAt: false,
  updatedAt: false,
})
export class CapacityModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  capacity: string;

  @BelongsToMany(() => ProductModel, () => ProductsCapacitiesColorsModel)
  products!: ProductModel[];

  @BelongsToMany(() => ColorModel, () => ProductsCapacitiesColorsModel)
  colors!: ColorModel[];
}
