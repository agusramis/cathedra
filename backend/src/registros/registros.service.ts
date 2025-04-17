import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registro } from './entities/registro.entity';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';

@Injectable()
export class RegistrosService {
  constructor(
    @InjectRepository(Registro)
    private readonly registroRepo: Repository<Registro>,
  ) {}

  create(dto: CreateRegistroDto) {
    return this.registroRepo.save({
      materia: { id: dto.materiaId },
      usuario: { id: dto.usuarioId },
    });
  }

  findAll() {
    return this.registroRepo.find({ relations: ['materia', 'usuario'] });
  }

  findOne(id: number) {
    return this.registroRepo.findOne({
      where: { id },
      relations: ['materia', 'usuario'],
    });
  }

  async update(id: number, dto: UpdateRegistroDto) {
    await this.registroRepo.update(id, {
      materia: { id: dto.materiaId },
      usuario: { id: dto.usuarioId },
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.registroRepo.delete(id);
  }
}