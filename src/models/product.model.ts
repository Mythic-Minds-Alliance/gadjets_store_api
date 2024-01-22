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
  HasMany
} from 'sequelize-typescript';
import { CategoryModel } from './category.model';
import { ColorModel } from './colors.model';
import { ProductsColors } from './products_colors';
import { ImageModel } from './image.model';
import { CapacityModel } from './capacity.model';
import { ProductsCapacities } from './products_capacities.model';
import { CellModel } from './cell.model';
import { ProductsCells } from './products_cells.model';

@Table(
  { 
    tableName: 'products',
    createdAt: false,
    updatedAt: false
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

  @AllowNull(false)
  @Column(DataType.STRING)
    color: string;

  @BelongsToMany(() => ColorModel, () => ProductsColors)
    colorsAvailable!: ColorModel[];

  @AllowNull(false)
  @Column(DataType.BIGINT)
    priceRegular: number;

  @AllowNull(false)
  @Column(DataType.STRING)
    image: string;

  @HasMany(() => ImageModel)
  @Column(DataType.STRING)
    images!: ImageModel[];

  @AllowNull(false)
  @Column(DataType.STRING)
    capacity: string;

  @BelongsToMany(() => CapacityModel, () => ProductsCapacities)
    capacitiesAvailable!: CapacityModel[];

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
    cells: string[];

  @AllowNull(false)
  @Column(DataType.BIGINT)
    year: number;
}
