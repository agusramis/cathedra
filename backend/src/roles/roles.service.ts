import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';


import { Role } from './entities/role.entity';
import { Permission } from '../permisos/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permisoRepo: Repository<Permission>,
  ) { }

  async create(nombre: string, permisoIds: number[]) {
    const permisos = await this.permisoRepo.findBy({ id: In(permisoIds) });

    return this.roleRepo.save({
      nombre,
      permisos: permisos,
    });
  }

  findAll() {
    return this.roleRepo.find({ relations: ['permisos'] });
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id }, relations: ['permisos'] });
  }
}