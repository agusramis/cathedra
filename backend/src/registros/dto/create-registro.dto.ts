import { IsInt } from 'class-validator';

export class CreateRegistroDto {
  @IsInt()
  materiaId!: number;

  @IsInt()
  usuarioId!: number;
}