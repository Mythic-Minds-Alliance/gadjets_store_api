/* eslint-disable */
import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { UserModel } from './users.roles.model';
import { CartItemModel } from './cartItem.model';

@Table({
  tableName: 'shopping_carts',
  createdAt: false,
  updatedAt: false,
})
export class ShoppingCartsModel extends Model {
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @HasMany(() => CartItemModel)
  cartItems: CartItemModel[];
}
