import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DocumentLabelEntity {
  @PrimaryGeneratedColumn()
  public SEQ!: number;

  @Column({ nullable: false })
  public DOC_ID!: number;

  @Column({ length: 500, nullable: false })
  public TYPE_CODE!: string;
}
