import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './entities/consulta.entity';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta])],
  controllers: [ConsultasController],
  providers: [ConsultasService],
})
export class ConsultasModule {}