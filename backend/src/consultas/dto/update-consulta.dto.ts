import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateConsultaDto {
  @IsOptional()
  @IsString()
  respuesta?: string;

  @IsOptional()
  @IsInt()
  respondidoPorId?: number;
}