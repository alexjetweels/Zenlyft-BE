import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
