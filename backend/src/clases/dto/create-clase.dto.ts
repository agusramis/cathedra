import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClaseDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsString()
  contenido!: string;

  @IsOptional()
  @IsInt()
  materiaId?: number;
}
