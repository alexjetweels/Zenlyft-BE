import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsEntity } from '../../../../permissions/infrastructure/persistence/relational/entities/permissions.entity';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private repository: Repository<PermissionsEntity>,
  ) {}

  async run() {
    const countPermission = await this.repository.count();

    if (!countPermission) {
      await this.repository.save(
        this.repository.create([
          { name: 'Create User' },
          { name: 'Update User' },
          { name: 'Delete User' },
          { name: 'View User' },
          { name: 'Create Role' },
          { name: 'Update Role' },
          { name: 'Delete Role' },
          { name: 'View Role' },
          { name: 'Create Permission' },
          { name: 'Update Permission' },
          { name: 'Delete Permission' },
          { name: 'View Permission' },
        ]),
      );
    }
  }
}
