import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  valor?: string;

  @IsOptional()
  @IsInt()
  materiaId?: number;

  @IsOptional()
  @IsInt()
  claseId?: number;
}