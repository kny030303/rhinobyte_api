import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PAGE_LABEL_CODE')
export class PageLabelCodeEntity {
  @PrimaryGeneratedColumn()
  public CODE!: number;

  @Column({ length: 500, nullable: false })
  public CODE_GRP!: string;

  @Column({ length: 500, nullable: true })
  public PARENT_CODE?: string;

  @Column({ length: 500, nullable: true })
  public CODE_KR_VALUE?: string;

  @Column({ length: 1, nullable: true })
  public CHILD_YN?: string;

  @Column({ length: 1, default: 'Y' })
  public USE_YN!: string;
}
