import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../roles/infrastructure/persistence/relational/entities/role.entity';
import { RelationalPermissionsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    RelationalPermissionsPersistenceModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
