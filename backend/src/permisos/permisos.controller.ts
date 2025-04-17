import { Controller, Post, Get, Body } from '@nestjs/common';
import { PermisosService } from './permisos.service';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  create(@Body() body: { clave: string; descripcion: string }) {
    return this.permisosService.create(body.clave, body.descripcion);
  }

  @Get()
  findAll() {
    return this.permisosService.findAll();
  }
}