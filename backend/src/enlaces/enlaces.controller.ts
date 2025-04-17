import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EnlacesService } from './enlaces.service';
import { CreateEnlaceDto } from './dto/create-enlace.dto';
import { UpdateEnlaceDto } from './dto/update-enlace.dto';

@Controller('enlaces')
export class EnlacesController {
  constructor(private readonly enlacesService: EnlacesService) {}

  @Post()
  create(@Body() dto: CreateEnlaceDto) {
    return this.enlacesService.create(dto);
  }

  @Get()
  findAll() {
    return this.enlacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enlacesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnlaceDto) {
    return this.enlacesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enlacesService.remove(+id);
  }
}