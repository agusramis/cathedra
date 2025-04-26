import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @ManyToOne(() => Materia, materia => materia.documentos, { onDelete: 'CASCADE' })
  materia!: Materia;
}