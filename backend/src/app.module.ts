import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MateriasModule } from './materias/materias.module';
import { ClasesModule } from './clases/clases.module';
import { CarrerasModule } from './carreras/carreras.module';
import { DocumentosModule } from './documentos/documentos.module';
import { RegistrosModule } from './registros/registros.module';
import { ConsultasModule } from './consultas/consultas.module';
import { EnlacesModule } from './enlaces/enlaces.module';
import { ItemsModule } from './items/items.module';
import { RolesModule } from './roles/roles.module';
import { PermisosModule } from './permisos/permisos.module';
import { typeOrmConfig } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    MateriasModule,
    ClasesModule,
    CarrerasModule,
    DocumentosModule,
    RegistrosModule,
    ConsultasModule,
    EnlacesModule,
    ItemsModule,
    RolesModule,
    PermisosModule,
  ],
})
export class AppModule {}