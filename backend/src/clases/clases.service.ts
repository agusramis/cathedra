import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from './entities/clase.entity';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepo: Repository<Clase>,
  ) { }


  create(dto: CreateClaseDto) {
    const clase = this.claseRepo.create(dto);

    return this.claseRepo.save(clase);
  }

  findAll() {
    return this.claseRepo.find();
  }

  findOne(id: number) {
    return this.claseRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateClaseDto) {
    await this.claseRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.claseRepo.delete(id);
  }

  async setearVisible(id: number) {
    const clase = await this.findOne(id);
    if (!clase) throw new NotFoundException('Clase no encontrada');
    clase.visible = !clase.visible;
    return this.claseRepo.save(clase);
  }

  async descargarPdf(id: number) {
    const clase = await this.findOne(id);
    return {
      filename: `clase_${id}.pdf`,
      content: `PDF de la clase: ${clase?.titulo}
    ${clase?.contenido}`,
    };
  }

  async borrar(id: number) {
    return this.remove(id);
  }
}