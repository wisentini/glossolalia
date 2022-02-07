import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ProgrammingLanguage } from './programming-language.entity';

@Entity({
  name: 'keyword'
})
export class Keyword extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    unique: false,
    name: 'programming_language_id',
    type: 'int8',
    nullable: false
  })
  programmingLanguageId: number;

  @Column({
    unique: false,
    name: 'name',
    type: 'varchar',
    nullable: false
  })
  name: string;

  @ManyToOne(type => ProgrammingLanguage)
  @JoinColumn({ name: 'id' })
  programmingLanguage: ProgrammingLanguage;
}
