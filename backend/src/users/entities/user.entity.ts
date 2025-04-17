import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Registro } from '../../registros/entities/registro.entity';
import { Consulta } from '../../consultas/entities/consulta.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToOne(() => Role, role => role.usuarios, { eager: true, onDelete: 'SET NULL' })
  rol!: Role;

  @OneToMany(() => Registro, registro => registro.usuario)
  registros!: Registro[];

  @OneToMany(() => Consulta, consulta => consulta.autor)
  consultas_realizadas!: Consulta[];

  @OneToMany(() => Consulta, consulta => consulta.respondidoPor)
  consultas_respondidas!: Consulta[];
}