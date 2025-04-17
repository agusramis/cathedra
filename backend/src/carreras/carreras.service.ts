import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepo: Repository<Carrera>,
  ) {}

  create(dto: CreateCarreraDto) {
    const carrera = this.carreraRepo.create(dto);
    return this.carreraRepo.save(carrera);
  }

  findAll() {
    return this.carreraRepo.find();
  }

  findOne(id: number) {
    return this.carreraRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCarreraDto) {
    await this.carreraRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.carreraRepo.delete(id);
  }
}