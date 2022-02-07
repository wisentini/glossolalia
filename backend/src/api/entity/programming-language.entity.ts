import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Keyword } from './keyword.entity';

@Entity({
  name: 'programming_language'
})
export class ProgrammingLanguage extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    unique: true,
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    unique: false,
    name: 'first_appeared',
    type: 'int2',
    nullable: false
  })
  firstAppeared: number;

  @Column({
    unique: false,
    name: 'paradigm',
    type: 'varchar',
    nullable: false,
    array: true
  })
  paradigm: string[];

  @Column({
    unique: false,
    name: 'designed_by',
    type: 'varchar',
    nullable: true,
    array: true
  })
  designedBy: string[] | null;

  @Column({
    unique: false,
    name: 'typing_discipline',
    type: 'varchar',
    nullable: true,
    array: true
  })
  typingDiscipline: string[] | null;

  @Column({
    unique: false,
    name: 'influenced_by',
    type: 'varchar',
    nullable: true,
    array: true
  })
  influencedBy: string[] | null;

  @Column({
    unique: false,
    name: 'influenced',
    type: 'varchar',
    nullable: true,
    array: true
  })
  influenced: string[] | null;

  @Column({
    unique: false,
    name: 'website_url',
    type: 'varchar',
    nullable: true,
    array: true
  })
  websiteUrl: string[] | null;

  @Column({
    unique: false,
    name: 'source_url',
    type: 'varchar',
    nullable: true,
    array: true
  })
  sourceUrl: string[] | null;

  @Column({
    unique: false,
    name: 'filename_extension',
    type: 'varchar',
    nullable: true,
    array: true
  })
  filenameExtension: string[] | null;

  @OneToMany(
    () => Keyword, keyword => keyword.programmingLanguage
  )
  keywords: Keyword[];
}
