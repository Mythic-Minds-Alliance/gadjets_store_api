/* eslint-disable */
import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table({
  tableName: 'categories',
  createdAt: false,
  updatedAt: false,
})
export class CategoryModel extends Model {
  @AutoIncrement
  @Unique
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
