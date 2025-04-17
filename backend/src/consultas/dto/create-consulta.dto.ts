import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateConsultaDto {
  @IsNotEmpty()
  @IsString()
  pregunta: string;

  @IsInt()
  autorId: number;

  @IsInt()
  materiaId: number;
}