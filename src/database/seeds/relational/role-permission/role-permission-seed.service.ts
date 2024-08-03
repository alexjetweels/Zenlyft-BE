import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionsEntity } from '../../../../role-permissions/infrastructure/persistence/relational/entities/role-permissions.entity';

@Injectable()
export class RolePermissionSeedService {
  constructor(
    @InjectRepository(RolePermissionsEntity)
    private repository: Repository<RolePermissionsEntity>,
  ) {}

  async run() {
    const countPermission = await this.repository.count();

    if (!countPermission) {
      await this.repository.save(
        this.repository.create([
          {
            roleId: 1,
            permissionId: 1,
          },
          {
            roleId: 1,
            permissionId: 2,
          },
          {
            roleId: 1,
            permissionId: 3,
          },
          {
            roleId: 1,
            permissionId: 4,
          },
          {
            roleId: 1,
            permissionId: 5,
          },
          {
            roleId: 1,
            permissionId: 6,
          },
          {
            roleId: 1,
            permissionId: 7,
          },
          {
            roleId: 1,
            permissionId: 8,
          },
          {
            roleId: 1,
            permissionId: 9,
          },
          {
            roleId: 1,
            permissionId: 10,
          },
          {
            roleId: 1,
            permissionId: 11,
          },
          {
            roleId: 1,
            permissionId: 12,
          },
          {
            roleId: 2,
            permissionId: 1,
          },
          {
            roleId: 2,
            permissionId: 2,
          },
          {
            roleId: 2,
            permissionId: 3,
          },
          {
            roleId: 2,
            permissionId: 4,
          },
          {
            roleId: 2,
            permissionId: 5,
          },
          {
            roleId: 2,
            permissionId: 6,
          },
          {
            roleId: 2,
            permissionId: 7,
          },
          {
            roleId: 2,
            permissionId: 8,
          },
          {
            roleId: 2,
            permissionId: 9,
          },
          {
            roleId: 2,
            permissionId: 10,
          },
          {
            roleId: 2,
            permissionId: 11,
          },
          {
            roleId: 2,
            permissionId: 12,
          },
        ]),
      );
    }
  }
}
