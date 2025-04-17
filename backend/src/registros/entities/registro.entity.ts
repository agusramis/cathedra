import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';
import { User } from '../../users/entities/user.entity';

@Entity('registros')
export class Registro {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Materia, materia => materia.registros, { onDelete: 'CASCADE' })
  materia!: Materia;

  @ManyToOne(() => User, user => user.registros, { onDelete: 'CASCADE' })
  usuario!: User;
}