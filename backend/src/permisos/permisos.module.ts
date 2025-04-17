import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermisosController],
  providers: [PermisosService],
})
export class PermisosModule {}