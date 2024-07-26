import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
@Index('USER_EMAIL_INDEX', ['EMAIL'])
@Index('USER_EMAIL_PASSWORD_INDEX', ['EMAIL', 'PASSWORD'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @PrimaryColumn({ length: 250, nullable: false })
  public EMAIL!: string;

  @Column({ length: 64, nullable: false })
  public PASSWORD!: string;

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
