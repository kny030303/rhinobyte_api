import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PageLabelMappingEntity } from '../page-label-mapping';

@Entity('PAGE_LABEL')
@Index('PAGE_LABEL_KOR_INDEX', ['CODE_KOR'])
@Index('PAGE_LABEL_ENG_INDEX', ['CODE_ENG'])
export class PageLabelEntity {
  @PrimaryColumn()
  public ID!: string;

  @Column({ length: 255, nullable: true })
  public CODE_GROUP: string;

  @Column({ length: 255, nullable: true })
  public PARENT_CODE: string;

  @Column({ length: 255, nullable: true })
  public CODE_KOR: string;

  @Column({ length: 255, nullable: true })
  public CODE_ENG: string;

  @Column({ default: false })
  public CHILD_CODE_YN: boolean;

  @Column({ default: false })
  public USE_CODE_YN: boolean;

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

  @OneToMany(() => PageLabelMappingEntity, (entity) => entity.PAGE_LABEL)
  public PAGE_LABEL_MAPPING?: PageLabelMappingEntity;
}
