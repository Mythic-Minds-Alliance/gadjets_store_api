/* eslint-disable */
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '../users/user.model';
import { OrderItemsModel } from './orderItems.model';

@Table({
  tableName: 'orders',
  createdAt: false,
  updatedAt: false,
})
export class OrderModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column(DataType.ENUM('pending', 'processing', 'shipped', 'delivered'))
  status: string;

  @Column(DataType.DECIMAL(10, 2))
  total: number;

  @Column(DataType.DATE)
  order_date: Date;

  @HasMany(() => OrderItemsModel)
  order_items: OrderItemsModel[];
}
