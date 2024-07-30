import { Module } from '@nestjs/common';
import { PermissionsRepository } from '../permissions.repository';
import { PermissionsRelationalRepository } from './repositories/permissions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './entities/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
  providers: [
    {
      provide: PermissionsRepository,
      useClass: PermissionsRelationalRepository,
    },
  ],
  exports: [PermissionsRepository],
})
export class RelationalPermissionsPersistenceModule {}
