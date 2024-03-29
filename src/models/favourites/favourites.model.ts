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
import { UserModel } from '../users/user.model';
import { ProductModel } from '../products/product.model';

@Table({
  tableName: 'favourites',
  createdAt: false,
  updatedAt: false,
})
export class FavouriteModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => ProductModel)
  @Column(DataType.INTEGER)
  productId: number;

  @Column(DataType.STRING)
  color: string;

  @Column(DataType.STRING)
  capacity: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
