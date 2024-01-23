/* eslint-disable */
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { ProductModel } from './product.model';
import { OrderModel } from './orders.model';

@Table({
  tableName: 'order_items',
  createdAt: false,
  updatedAt: false,
})
export class OrderItemsModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => OrderModel)
  @Column(DataType.INTEGER)
  order_id: number;

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  product_id: number;

  @BelongsTo(() => OrderModel)
  order: OrderModel;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.DECIMAL(10, 2))
  price: number;
}
