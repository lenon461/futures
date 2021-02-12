import { Column, Entity, ObjectID, CreateDateColumn, PrimaryGeneratedColumn, Timestamp, ObjectIdColumn } from 'typeorm'
import { MaxLength, IsNotEmpty, IsString } from 'class-validator'

@Entity()
export class Summoner {
  @ObjectIdColumn()
  SIDX: ObjectID;

  @ObjectIdColumn()
  accountId: string;

  @Column()
  puuid: string;

  @Column()
  name: string;

  @Column()
  profileIconId: number;

  @Column()
  revisionDate: number;

  @Column()
  summonerLevel: number;
}

export class CreateSummonerDto {
  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  puuid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  profileIconId: number;

  @IsNotEmpty()
  revisionDate: number;

  @IsNotEmpty()
  summonerLevel: number;
}
