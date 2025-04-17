import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './entities/consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepo: Repository<Consulta>,
  ) {}

  create(dto: CreateConsultaDto) {
    return this.consultaRepo.save({
      pregunta: dto.pregunta,
      autor: { id: dto.autorId },
      materia: { id: dto.materiaId },
    });
  }

  findAll() {
    return this.consultaRepo.find({ relations: ['autor', 'materia', 'respondidoPor'] });
  }

  findOne(id: number) {
    return this.consultaRepo.findOne({ where: { id }, relations: ['autor', 'materia', 'respondidoPor'] });
  }

  async responder(id: number, dto: UpdateConsultaDto) {
    await this.consultaRepo.update(id, {
      respuesta: dto.respuesta,
      respondidoPor: dto.respondidoPorId ? { id: dto.respondidoPorId } : undefined,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.consultaRepo.delete(id);
  }
}