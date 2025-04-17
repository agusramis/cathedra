import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../permisos/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permisoRepo: Repository<Permission>,
  ) {}

  create(nombre: string, permisoIds: number[]) {
    return this.roleRepo.save({
      nombre,
      permisos: permisoIds.map(id => ({ id })),
    });
  }

  findAll() {
    return this.roleRepo.find({ relations: ['permisos'] });
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id }, relations: ['permisos'] });
  }
}