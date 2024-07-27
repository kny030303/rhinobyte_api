import { DocumentsEntity } from '../../document';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PageLabelMappingEntity } from '../page-label-mapping';

@Entity('PAGES')
@Index('PAGES_DOC_ID_INDEX', ['DOC_ID'])
@Unique(['DOC_ID', 'PAGE_NO'])
export class PagesEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column()
  public DOC_ID!: number;

  @Column({ nullable: false })
  public PAGE_NO!: number;

  @Column({ nullable: true })
  public WIDTH?: number;

  @Column({ nullable: true })
  public HEIGHT?: number;

  @Column({ default: false })
  public LABEL_YN?: boolean;

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

  @DeleteDateColumn()
  public DELETED_AT?: Date;

  @Column({ length: 255, nullable: false })
  public LAST_MODIFIED_BY!: string;

  @ManyToOne(() => DocumentsEntity, (entity) => entity.PAGES)
  @JoinColumn({ name: 'DOC_ID', referencedColumnName: 'ID' })
  public DOCUMENTS?: DocumentsEntity;

  @OneToMany(() => PageLabelMappingEntity, (entity) => entity.PAGES)
  public PAGE_LABEL_MAPPING?: PageLabelMappingEntity;
}
