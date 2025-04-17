import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepo: Repository<Documento>,
  ) {}

  create(dto: CreateDocumentoDto) {
    const doc = this.documentoRepo.create(dto);
    return this.documentoRepo.save(doc);
  }

  findAll() {
    return this.documentoRepo.find();
  }

  findOne(id: number) {
    return this.documentoRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateDocumentoDto) {
    await this.documentoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.documentoRepo.delete(id);
  }
}