import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permission)
    private permisoRepo: Repository<Permission>,
  ) {}

  create(clave: string, descripcion: string) {
    return this.permisoRepo.save({ clave, descripcion });
  }

  findAll() {
    return this.permisoRepo.find();
  }
}