import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { RelationalPermissionsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalPermissionsPersistenceModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService, RelationalPermissionsPersistenceModule],
})
export class PermissionsModule {}
