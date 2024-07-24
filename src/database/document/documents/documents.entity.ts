import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentCategoryCodeEntity } from '../document-category-code';
import { DocumentLabelMappingEntity } from '../document-label-mapping';
import { PagesEntity } from '../../page';

@Entity('DOCUMENTS')
@Index('DOCUMENTS_FILE_NAME_INDEX', ['FILE_NAME'])
@Index('DOCUMENTS_DOC_CATEGORY_INDEX', ['DOC_CATEGORY'])
export class DocumentsEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column({ length: 500, nullable: false })
  public DOC_CATEGORY!: string;

  @Column({ length: 500, nullable: false })
  public FILE_NAME!: string;

  @Column({ length: 500, nullable: false })
  public FILE_PATH!: string;

  @Column({ nullable: false })
  public TOTAL_PAGES!: number;

  @Column({ length: 500, nullable: true })
  public CLIENT?: string;

  @Column({ length: 500, nullable: true })
  public BUSINESS?: string;

  @Column({ length: 500, nullable: true })
  public LOCATION?: string;

  @Column({ length: 500, nullable: true })
  public ADDRESS?: string;

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

  @DeleteDateColumn()
  public DELETED_AT?: Date;

  @OneToOne(() => DocumentCategoryCodeEntity, (entity) => entity.DOCUMENTS)
  @JoinColumn({ name: 'DOC_CATEGORY', referencedColumnName: 'ID' })
  public DOCUMENT_CATEGORY_CODE!: DocumentCategoryCodeEntity;

  @OneToMany(() => DocumentLabelMappingEntity, (entity) => entity.DOCUMENTS)
  public DOCUMENT_LABEL_MAPPING?: DocumentLabelMappingEntity;

  @OneToMany(() => PagesEntity, (entity) => entity.DOCUMENTS)
  public PAGES?: PagesEntity;
}
