import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enlace } from './entities/enlace.entity';
import { EnlacesService } from './enlaces.service';
import { EnlacesController } from './enlaces.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enlace])],
  controllers: [EnlacesController],
  providers: [EnlacesService],
})
export class EnlacesModule {}