import { Module } from '@nestjs/common';
import { RolePermissionsRepository } from '../role-permissions.repository';
import { RolePermissionsRelationalRepository } from './repositories/role-permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionsEntity } from './entities/role-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionsEntity])],
  providers: [
    {
      provide: RolePermissionsRepository,
      useClass: RolePermissionsRelationalRepository,
    },
  ],
  exports: [RolePermissionsRepository],
})
export class RelationalRolePermissionsPersistenceModule {}
