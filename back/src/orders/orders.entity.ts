import { Column, Entity, ObjectID, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, ObjectIdColumn } from 'typeorm'
import { MaxLength, IsNotEmpty, IsString } from 'class-validator'

@Entity()
export class Order {
  @ObjectIdColumn()
  OCIDX: ObjectID;

  @Column()
  MKIDX: string;

  @Column()
  MIDX: string;

  @Column()
  OC_TYPE: string;

  @Column()
  OC_KIND: string;

  @Column()
  OC_PRICE: number;

  @Column()
  OC_QTY: number;

  @Column()
  OC_TQTY: number;

  @Column()
  OC_STATUS: string;

  @CreateDateColumn()
  OC_CREATEDTIME: Date;
}

export class CreateOrderDto {
  @IsNotEmpty()
  MKIDX: string;

  @IsNotEmpty()
  MIDX: string;

  @IsNotEmpty()
  OC_TYPE: string;

  @IsNotEmpty()
  OC_KIND: string;

  @IsNotEmpty()
  OC_PRICE: number;

  @IsNotEmpty()
  OC_QTY: number;
}
