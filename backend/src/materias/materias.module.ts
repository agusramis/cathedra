import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  providers: [MateriasService],
  controllers: [MateriasController],
})
export class MateriasModule {}