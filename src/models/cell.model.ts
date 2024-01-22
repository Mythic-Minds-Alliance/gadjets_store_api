import { 
  Table,
  Column,
  Model,
  AutoIncrement,
  DataType,
  AllowNull,
  PrimaryKey,
  Unique
} from 'sequelize-typescript';


@Table(
  { 
    tableName: 'cells',
    createdAt: false,
    updatedAt: false
})

export class CellModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;
}
