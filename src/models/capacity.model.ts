/* eslint-disable */
import {
  Table,
  Column,
  Model,
  AutoIncrement,
  DataType,
  AllowNull,
  PrimaryKey,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'capacities',
  createdAt: false,
  updatedAt: false,
})
export class CapacityModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  capacity: string;
}
