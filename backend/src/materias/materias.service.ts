import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Materia } from './entities/materia.entity';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepo: Repository<Materia>,
  ) {}

  create(dto: CreateMateriaDto) {
    const materia = this.materiaRepo.create(dto);
    return this.materiaRepo.save(materia);
  }

  findAll() {
    return this.materiaRepo.find();
  }

  findOne(id: number) {
    return this.materiaRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateMateriaDto) {
    await this.materiaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.materiaRepo.delete(id);
  }
}