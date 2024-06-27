import { PagesEntity } from '../../../database/page';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentLabelEntity } from '../document-label';

@Entity('DOCUMENTS')
export class DocumentsEntity {
  @PrimaryGeneratedColumn()
  public DOC_ID!: number;

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

  @OneToOne(() => PagesEntity, (entity) => entity.DOCUMENT)
  public PAGES!: PagesEntity;

  @OneToMany(() => DocumentLabelEntity, (entity) => entity.DOCUMENT)
  public DOCUMENT_LABELS!: DocumentLabelEntity[];
}
