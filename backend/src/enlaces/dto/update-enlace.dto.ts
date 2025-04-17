import { PartialType } from '@nestjs/mapped-types';
import { CreateEnlaceDto } from './create-enlace.dto';

export class UpdateEnlaceDto extends PartialType(CreateEnlaceDto) {}