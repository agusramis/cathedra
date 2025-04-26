import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  pregunta!: string;

  @Column('text', { nullable: true })
  respuesta!: string;

  @ManyToOne(() => User, user => user.consultas_realizadas, { onDelete: 'CASCADE' })
  autor!: User;

  @ManyToOne(() => User, user => user.consultas_respondidas, { onDelete: 'SET NULL', nullable: true })
  respondidoPor!: User;

  @ManyToOne(() => Materia, materia => materia.consultas, { onDelete: 'CASCADE' })
  materia!: Materia;
}