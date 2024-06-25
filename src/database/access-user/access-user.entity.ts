import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AccessUserEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column({ length: 250, nullable: false })
  public USER_EMAIL!: string;

  @Column({ length: 64, nullable: false })
  public USER_PASSWORD!: string;

  @Column({ type: 'boolean', nullable: false })
  public USER_ACCESS: boolean = false;

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
