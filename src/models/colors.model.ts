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
    tableName: 'colors',
    createdAt: false,
    updatedAt: false
})

export class ColorModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
}
