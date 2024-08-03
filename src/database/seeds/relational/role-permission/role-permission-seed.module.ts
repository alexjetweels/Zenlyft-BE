import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionSeedService } from './role-permission-seed.service';
import { RolePermissionsEntity } from '../../../../role-permissions/infrastructure/persistence/relational/entities/role-permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionsEntity])],
  providers: [RolePermissionSeedService],
  exports: [RolePermissionSeedService],
})
export class RolePermissionSeedModule {}
