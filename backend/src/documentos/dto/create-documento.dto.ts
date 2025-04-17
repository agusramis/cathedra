import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDocumentoDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  materiaId?: number;
}