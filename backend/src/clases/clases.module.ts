import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clase])],
  providers: [ClasesService],
  controllers: [ClasesController],
})
export class ClasesModule {}