import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';
import { Clase } from '../../clases/entities/clase.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  valor!: string;

  @ManyToOne(() => Materia, materia => materia.items, { nullable: true, onDelete: 'CASCADE' })
  materia!: Materia;

  @ManyToOne(() => Clase, clase => clase.items, { nullable: true, onDelete: 'CASCADE' })
  clase!: Clase;
}