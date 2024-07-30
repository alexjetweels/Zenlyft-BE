import { RolePermissions } from '../../../../domain/role-permissions';
import { RolePermissionsEntity } from '../entities/role-permissions.entity';

export class RolePermissionsMapper {
  static toDomain(raw: RolePermissionsEntity): RolePermissions {
    const domainEntity = new RolePermissions();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RolePermissions): RolePermissionsEntity {
    const persistenceEntity = new RolePermissionsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
