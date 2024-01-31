/* eslint-disable */
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  DataType,
  AllowNull,
  PrimaryKey,
  BelongsToMany,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { CategoryModel } from '../productDetails/category.model';
import { ColorModel } from '../productDetails/colors.model';
import { ImageModel } from '../productDetails/image.model';
import { CapacityModel } from '../productDetails/capacity.model';
import { CellModel } from '../productDetails/cell.model';
import { ProductsCells } from './products_cells.model';
import { ProductsCapacitiesColorsModel } from './products_capacities_colors.model';
import { ProductColorImageModel } from './product_color_images.model';

@Table({
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
})
export class ProductModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => CategoryModel)
  @Column
  categoryId: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  brand: string;

  @BelongsToMany(() => ColorModel, () => ProductColorImageModel)
  colorsAvailable: ColorModel[];

  @BelongsToMany(() => CapacityModel, () => ProductsCapacitiesColorsModel)
  capacitiesAvailable!: CapacityModel[];

  @HasMany(() => ProductsCapacitiesColorsModel)
  productPrices: ProductsCapacitiesColorsModel[];

  @HasMany(() => ProductColorImageModel)
  productColorImages!: ProductColorImageModel[];

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  description!: { title: string; text: string[] }[];

  @AllowNull(false)
  @Column(DataType.STRING)
  resolution: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  screen: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  processor: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  ram: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  camera?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  zoom?: string;

  @BelongsToMany(() => CellModel, () => ProductsCells)
  cells: CellModel[];

  @AllowNull(false)
  @Column(DataType.BIGINT)
  year: number;
}
