import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Permission } from '../../permisos/entities/permission.entity';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @JoinTable()
  @ManyToMany(() => Permission, permiso => permiso.roles, { cascade: true })
  permisos!: Permission[];

  @OneToMany(() => User, user => user.rol)
  usuarios!: User[];
}