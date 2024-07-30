import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
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
