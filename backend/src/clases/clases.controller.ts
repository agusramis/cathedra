import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Post()
  create(@Body() createClaseDto: CreateClaseDto) {
    return this.clasesService.create(createClaseDto);
  }

  @Get()
  findAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clasesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClaseDto: UpdateClaseDto) {
    return this.clasesService.update(+id, updateClaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clasesService.remove(+id);
  }

  @Put(':id/setearvisible')
  setearVisible(@Param('id') id: string) {
    return this.clasesService.setearVisible(+id);
  }

  @Get(':id/descargarpdf')
  descargarPdf(@Param('id') id: string) {
    return this.clasesService.descargarPdf(+id);
  }

  @Delete(':id/borrar')
  borrar(@Param('id') id: string) {
    return this.clasesService.borrar(+id);
  }
}