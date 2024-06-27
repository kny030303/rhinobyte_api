import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('PAGE_LABEL_HISTORY')
export class PageLabelHistoryEntity {
  @PrimaryGeneratedColumn()
  public SEQ!: number;

  @Column({ nullable: false })
  public PAGE_ID!: number;

  @Column({ length: 500, nullable: true })
  public L1_CODE?: string;

  @Column({ length: 500, nullable: true })
  public L2_CODE?: string;

  @Column({ length: 500, nullable: true })
  public L3_CODE?: string;

  @Column({ length: 500, nullable: true })
  public L4_CODE?: string;

  @Column({ length: 500, nullable: true })
  public L5_CODE?: string;

  @Column({ length: 500, nullable: false })
  public LABELER_ID!: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public LABEL_DATE!: Date;
}
