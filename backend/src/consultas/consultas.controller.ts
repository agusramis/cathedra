import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(+id);
  }

  @Put(':id/responder')
  responder(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
    return this.consultasService.responder(+id, updateConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(+id);
  }
}