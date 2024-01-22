import { Model, Column, Table, AutoIncrement, Unique, ForeignKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { ProductModel } from './product.model';

@Table({
  tableName: 'images',
  createdAt: false,
  updatedAt: false,
})

export class ImageModel extends Model {
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => ProductModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    path: string;
}


