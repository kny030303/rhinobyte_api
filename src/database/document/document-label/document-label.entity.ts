import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentsEntity } from '../documents';

@Entity('DOCUMENT_LABEL')
export class DocumentLabelEntity {
  @PrimaryGeneratedColumn()
  public SEQ!: number;

  @Column()
  public DOC_ID!: number;

  @ManyToOne(() => DocumentsEntity, (entity) => entity.DOCUMENT_LABELS)
  @JoinColumn({ name: 'DOC_ID', referencedColumnName: 'DOC_ID' })
  public DOCUMENT!: DocumentsEntity;

  @Column({ length: 500, nullable: false })
  public TYPE_CODE!: string;
}
