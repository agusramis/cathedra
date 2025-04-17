import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Materia } from '../../../materias/entities/materia.entity';
import { Clase } from '../../../clases/entities/clase.entity';

@Entity('enlaces')
export class Enlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  url: string;

  @ManyToOne(() => Materia, materia => materia.enlaces, { nullable: true, onDelete: 'CASCADE' })
  materia: Materia;

  @ManyToOne(() => Clase, clase => clase.enlaces, { nullable: true, onDelete: 'CASCADE' })
  clase: Clase;
}