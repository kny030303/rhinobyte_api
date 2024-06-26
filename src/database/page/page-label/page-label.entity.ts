import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PageLabelEntity {
  @PrimaryGeneratedColumn()
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

  @Column({ length: 1, default: 'N' })
  public LABEL_YN!: string;
}
