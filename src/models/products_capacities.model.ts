import { 
  Table,
  Column,
  Model,
  DataType,
  ForeignKey
} from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { CapacityModel } from './capacity.model';


@Table(
  { 
    tableName: 'products_capacities',
    createdAt: false,
    updatedAt: false
})

export class ProductsCapacities extends Model {
  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  productId!: number;

  @ForeignKey(() => CapacityModel)
  @Column(DataType.INTEGER)
  capacityId!: number;
}
