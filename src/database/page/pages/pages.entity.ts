import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PagesEntity {
  @PrimaryGeneratedColumn()
  public PAGE_ID!: number;

  @PrimaryColumn({ nullable: false })
  public DOC_ID!: number;

  @Column({ nullable: false })
  public PAGE_NO!: number;

  @Column({ nullable: true })
  public WIDTH?: number;

  @Column({ nullable: true })
  public HEIGHT?: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public CREATED_AT!: Date;

  @Column({ length: 255, nullable: false })
  public CREATED_BY!: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public LAST_MODIFIED_AT!: Date;

  @Column({ length: 255, nullable: false })
  public LAST_MODIFIED_BY!: string;
}
