import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PagesEntity } from '../pages';
import { PageLabelEntity } from '../page-label';

@Entity('PAGE_LABEL_MAPPING')
@Index('PAGE_LABEL_MAPPING_PAGE_ID_INDEX', ['PAGE_ID'])
@Index('PAGE_LABEL_MAPPING_PAGE_LABEL_INDEX', ['PAGE_ID', 'LABEL_ID'])
export class PageLabelMappingEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column()
  public PAGE_ID: number;

  @Column()
  public LABEL_ID: number;

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

  @ManyToOne(() => PagesEntity, (entity) => entity.PAGE_LABEL_MAPPING)
  @JoinColumn({ name: 'PAGE_ID', referencedColumnName: 'ID' })
  public PAGES?: PagesEntity;

  @ManyToOne(() => PageLabelEntity, (entity) => entity.PAGE_LABEL_MAPPING)
  @JoinColumn({ name: 'LABEL_ID', referencedColumnName: 'ID' })
  public PAGE_LABEL?: PageLabelEntity;
}
