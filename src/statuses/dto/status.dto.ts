import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../domain/status';
import { IsNumber } from 'class-validator';

export class StatusDto implements Status {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string;

  @ApiProperty({
    type: String,
    example: '2021-09-01T00:00:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    type: String,
    example: '2021-09-01T00:00:00.000Z',
  })
  updatedAt?: Date;
}
