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
import { DocumentLabelEntity } from '../document-label';
import { DocumentsEntity } from '../documents';

@Entity('DOCUMENT_LABEL_MAPPING')
@Index('DOCUMENT_LABEL_MAPPING_DOC_ID_INDEX', ['DOC_ID'])
@Index('DOCUMENT_LABEL_MAPPING_DOC_LABEL_INDEX', ['DOC_ID', 'LABEL_ID'])
export class DocumentLabelMappingEntity {
  @PrimaryGeneratedColumn()
  public ID!: number;

  @Column({ nullable: false })
  public DOC_ID!: number;

  @Column({ nullable: false })
  public LABEL_ID!: string;

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

  @ManyToOne(() => DocumentsEntity, (entity) => entity.DOCUMENT_LABEL_MAPPING)
  @JoinColumn({ name: 'DOC_ID', referencedColumnName: 'ID' })
  public DOCUMENTS?: DocumentsEntity;

  @ManyToOne(
    () => DocumentLabelEntity,
    (entity) => entity.DOCUMENT_LABEL_MAPPING,
  )
  @JoinColumn({ name: 'LABEL_ID', referencedColumnName: 'ID' })
  public DOCUMENT_LABEL?: DocumentLabelEntity;
}
