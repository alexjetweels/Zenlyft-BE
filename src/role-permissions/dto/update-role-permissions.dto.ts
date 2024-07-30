// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRolePermissionsDto } from './create-role-permissions.dto';

export class UpdateRolePermissionsDto extends PartialType(
  CreateRolePermissionsDto,
) {}
