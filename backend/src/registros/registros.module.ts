import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registro } from './entities/registro.entity';
import { RegistrosService } from './registros.service';
import { RegistrosController } from './registros.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registro])],
  providers: [RegistrosService],
  controllers: [RegistrosController],
})
export class RegistrosModule {}