import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Materia } from '../../materias/entities/materia.entity';
import { Item } from '../../items/entities/item.entity';
import { Enlace } from '../../enlaces/entities/enlace.entity';


@Entity('clases')
export class Clase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column('text')
  contenido!: string;

  @Column({ default: false })
  visible!: boolean;

  @ManyToOne(() => Materia, materia => materia.clases, { onDelete: 'CASCADE' })
  materia!: Materia;

  @OneToMany(() => Item, item => item.clase, { cascade: true })
  items!: Item[];

  @OneToMany(() => Enlace, item => item.clase, { cascade: true })
  enlaces!: Enlace[];
}