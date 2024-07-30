import { ApiProperty } from '@nestjs/swagger';

export class Permissions {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
