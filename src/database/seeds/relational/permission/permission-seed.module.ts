import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from '../../../../permissions/infrastructure/persistence/relational/entities/permissions.entity';
import { PermissionSeedService } from './permission-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  providers: [PermissionSeedService],
  exports: [PermissionSeedService],
})
export class PermissionSeedModule {}
