import { ApiProperty } from '@nestjs/swagger';

export class RolePermissions {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
