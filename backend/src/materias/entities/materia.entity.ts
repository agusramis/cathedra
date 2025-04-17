import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Clase } from '../../clases/entities/clase.entity';
import { Documento } from '../../documentos/entities/documento.entity';
import { Registro } from '../../registros/entities/registro.entity';
import { Consulta } from '../../consultas/entities/consulta.entity';
import { Carrera } from '../../carreras/entities/carrera.entity';
import { Item } from '../../items/entities/item.entity';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @ManyToOne(() => Carrera, carrera => carrera.materias, { onDelete: 'CASCADE' })
  carrera!: Carrera;

  @OneToMany(() => Clase, clase => clase.materia)
  clases!: Clase[];

  @OneToMany(() => Documento, documento => documento.materia)
  documentos!: Documento[];

  @OneToMany(() => Registro, registro => registro.materia)
  registros!: Registro[];

  @OneToMany(() => Consulta, consulta => consulta.materia)
  consultas!: Consulta[];

  @OneToMany(() => Item, item => item.materia, { cascade: true })
  items!: Item[];
}