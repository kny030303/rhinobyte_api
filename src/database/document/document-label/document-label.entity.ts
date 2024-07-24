import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentLabelMappingEntity } from '../document-label-mapping';

@Entity('DOCUMENT_LABEL')
export class DocumentLabelEntity {
  @PrimaryColumn()
  public ID!: string;

  @Column({ length: 255, nullable: false })
  public CODE_GROUP!: string;

  @Column({ length: 255, nullable: true })
  public CODE_KOR: string;

  @Column({ length: 255, nullable: true })
  public CODE_ENG: string;

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

  @OneToMany(
    () => DocumentLabelMappingEntity,
    (entity) => entity.DOCUMENT_LABEL,
  )
  public DOCUMENT_LABEL_MAPPING!: DocumentLabelMappingEntity;
}
