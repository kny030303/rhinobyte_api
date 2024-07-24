import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ACCESS_USER')
@Index('ACCESS_USER_EMAIL_INDEX', ['EMAIL'])
@Index('ACCESS_USER_ACCESS_EMAIL_INDEX', ['EMAIL', 'ACCESS'])
export class AccessUserEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column({ length: 250, nullable: false })
  public EMAIL!: string;

  @Column({ length: 64, nullable: false })
  public PASSWORD!: string;

  @Column({ type: 'boolean', nullable: false })
  public ACCESS: boolean = false;

  @Column({ length: 500, nullable: false })
  public USER_VERIFY_KEY!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public CREATED_AT!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public UPDATED_AT!: Date;
}
