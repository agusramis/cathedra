import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enlace } from './entities/enlace.entity';
import { CreateEnlaceDto } from './dto/create-enlace.dto';
import { UpdateEnlaceDto } from './dto/update-enlace.dto';

@Injectable()
export class EnlacesService {
  constructor(
    @InjectRepository(Enlace)
    private readonly repo: Repository<Enlace>,
  ) {}

  create(dto: CreateEnlaceDto) {
    return this.repo.save({
      ...dto,
      materia: dto.materiaId ? { id: dto.materiaId } : null,
      clase: dto.claseId ? { id: dto.claseId } : null,
    });
  }

  findAll() {
    return this.repo.find({ relations: ['materia', 'clase'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['materia', 'clase'] });
  }

  async update(id: number, dto: UpdateEnlaceDto) {
    await this.repo.update(id, {
      ...dto,
      materia: dto.materiaId ? { id: dto.materiaId } : null,
      clase: dto.claseId ? { id: dto.claseId } : null,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }
}