import { PrimaryColumn, Column, Entity, ObjectID, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, ObjectIdColumn } from 'typeorm'
import { MaxLength, IsNotEmpty, IsString } from 'class-validator'

@Entity()
export class Asset {
  @ObjectIdColumn()
  MIDX: ObjectID;

  @ObjectIdColumn()
  SIDX: ObjectID;

  @Column()
  TOTAL_AMOUNT: number;

  @Column()
  USING_AMOUNT: number;
}

export class CreateAssetDto {
  @IsNotEmpty()
  MIDX: string;

  @IsNotEmpty()
  CIDX: string;
}
