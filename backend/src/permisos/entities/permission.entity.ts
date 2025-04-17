import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('permisos')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  clave!: string;

  @Column()
  descripcion!: string;

  @ManyToMany(() => Role, rol => rol.permisos)
  roles!: Role[];
}