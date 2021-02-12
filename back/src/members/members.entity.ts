import { Column, Entity, ObjectID, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, ObjectIdColumn } from 'typeorm'
import { MaxLength, IsNotEmpty, IsString } from 'class-validator'

@Entity()
export class Member {
  @ObjectIdColumn()
  MIDX: ObjectID;

  @Column()
  M_ID: string;

  @Column()
  M_NAME: string;

  @Column()
  M_PASSWD: string;

  @CreateDateColumn()
  M_CREATEDTIME: Date;
}

export class CreateMemberDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  passwd: string;

}
