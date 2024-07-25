import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentsEntity } from '../documents';

@Entity('DOCUMENT_CATEGORY_CODE')
export class DocumentCategoryCodeEntity {
  @PrimaryColumn()
  public ID!: string;

  @Column({ length: 255, nullable: false })
  public CODE_GROUP!: string;

  @Column({ length: 255, nullable: true })
  public CODE_KOR: string;

  @Column({ length: 255, nullable: true })
  public CODE_ENG: string;

  @OneToOne(() => DocumentCategoryCodeEntity)
  public DOCUMENTS?: DocumentsEntity;
}
