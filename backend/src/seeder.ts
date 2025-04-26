// src/seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { MateriasService } from './materias/materias.service';
import { ClasesService } from './clases/clases.service';
import { ConsultasService } from './consultas/consultas.service';
import { EnlacesService } from './enlaces/enlaces.service';
import { ItemsService } from './items/items.service';
import { RegistrosService } from './registros/registros.service';
import { DocumentosService } from './documentos/documentos.service';
import { RolesService } from './roles/roles.service';
import { PermisosService } from './permisos/permisos.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const materiasService = app.get(MateriasService);
  const clasesService = app.get(ClasesService);
  const consultasService = app.get(ConsultasService);
  const enlacesService = app.get(EnlacesService);
  const itemsService = app.get(ItemsService);
  const registrosService = app.get(RegistrosService);
  const documentosService = app.get(DocumentosService);
  const rolesService = app.get(RolesService);
  const permisosService = app.get(PermisosService);

  // Permisos y roles
  const p1 = await permisosService.create('admin', 'Acceso total');
  const p2 = await permisosService.create('ver_consultas', 'Ver y responder consultas');
  if (!p1 || !p2) {
    console.log("🚀 ~ bootstrap ~ p2:", p2)
    console.log("🚀 ~ bootstrap ~ p1:", p1)
    throw new Error('Permisos requeridos no encontrados');
  }
  const adminRole = await rolesService.create('Admin', [p1.id, p2.id]);
  const profeRole = await rolesService.create('Profesor', [p2.id]);
  const alumnoRole = await rolesService.create('Alumno', []);

  const admin = await usersService.create({ email: 'admin@example.com', password: 'admin123', rol: adminRole });
  const profe = await usersService.create({ email: 'profe@example.com', password: 'profe123', rol: profeRole });
  const alumno = await usersService.create({ email: 'alumno@example.com', password: 'alumno123', rol: alumnoRole });

  // Materias y clases
  const mate = await materiasService.create({ nombre: 'Matemática', descripcion: 'Funciones y álgebra' });
  const hist = await materiasService.create({ nombre: 'Historia', descripcion: 'Universal' });

  await clasesService.create({ titulo: 'Clase 1', contenido: 'Contenido clase 1', materiaId: mate.id });
  await clasesService.create({ titulo: 'Clase 2', contenido: 'Contenido clase 2', materiaId: hist.id });

  // Registros
  await registrosService.create({ usuarioId: alumno.id, materiaId: mate.id });
  await registrosService.create({ usuarioId: profe.id, materiaId: mate.id });

  // Consulta + respuesta
  const consulta = await consultasService.create({ pregunta: '¿Qué entra en el parcial?', autorId: alumno.id, materiaId: mate.id });
  await consultasService.responder(consulta.id, { respuesta: 'Todo lo visto hasta ahora', respondidoPorId: profe.id });

  // Documentos, enlaces e items
  await documentosService.create({ titulo: 'Guía PDF', url: 'https://google.com/guia.pdf', materiaId: mate.id });
  await enlacesService.create({ titulo: 'Sitio oficial', url: 'https://educacion.gob.ar', materiaId: mate.id });
  await itemsService.create({ nombre: 'Trabajo Práctico', valor: 'Resolver ejercicios', materiaId: mate.id });

  console.log('✅ Base de datos poblada con datos de ejemplo.');
  await app.close();
}

bootstrap();
