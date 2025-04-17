import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  create(dto: CreateItemDto) {
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

  async update(id: number, dto: UpdateItemDto) {
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