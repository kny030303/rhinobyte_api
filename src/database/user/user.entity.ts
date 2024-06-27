import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public USER_ID!: number;

  @PrimaryColumn({ length: 250, nullable: false })
  public USER_EMAIL!: string;

  @Column({ length: 64, nullable: false })
  public USER_PASSWORD!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public CREATED_AT!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public UPDATED_AT!: Date;

  @DeleteDateColumn()
  public DELETED_AT?: Date;
}
