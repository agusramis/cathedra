import { Controller, Post, Get, Body } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: { nombre: string; permisoIds: number[] }) {
    return this.rolesService.create(body.nombre, body.permisoIds);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}