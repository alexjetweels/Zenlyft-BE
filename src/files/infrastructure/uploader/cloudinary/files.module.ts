import { Module } from '@nestjs/common';
import { CloudinaryController } from './files.controller';

import { CloudinaryService } from './files.service';
import { RelationalFilePersistenceModule } from '../../persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalFilePersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
