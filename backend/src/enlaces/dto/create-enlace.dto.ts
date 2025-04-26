import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class CreateEnlaceDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsInt()
  materiaId?: number;

  @IsOptional()
  @IsInt()
  claseId?: number;
}