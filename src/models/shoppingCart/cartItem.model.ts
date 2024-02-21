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
  PrimaryKey,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { ShoppingCartsModel } from './shoppingCarts.model';
import { ProductModel } from '../products/product.model';

@Table({
  tableName: 'cart_items',
  createdAt: false,
  updatedAt: false,
})
export class CartItemModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => ShoppingCartsModel)
  @Column(DataType.INTEGER)
  shopping_cart_id: number;

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  product_id: number;

  @BelongsTo(() => ShoppingCartsModel)
  shopping_cart: ShoppingCartsModel;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

  @Column(DataType.STRING)
  color: string;

  @Column(DataType.STRING)
  capacity: string;

  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.INTEGER)
  price: number;
}
