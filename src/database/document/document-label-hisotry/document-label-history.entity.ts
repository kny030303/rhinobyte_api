import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DocumentLabelHistoryEntity {
  @PrimaryGeneratedColumn()
  public SEQ!: number;

  @Column({ nullable: false })
  public DOC_ID!: number;

  @Column({ length: 500, nullable: false })
  public TYPE_CODE!: string;

  @Column({ length: 500, nullable: false })
  public LABELER_ID!: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public LABEL_DATE!: Date;
}
