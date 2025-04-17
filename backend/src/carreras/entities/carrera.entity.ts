import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('carreras')
export class Carrera {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @OneToMany(() => Materia, materia => materia.carrera)
  materias!: Materia[];
}