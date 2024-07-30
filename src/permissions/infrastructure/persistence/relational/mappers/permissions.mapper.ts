import { Permissions } from '../../../../domain/permissions';
import { PermissionsEntity } from '../entities/permissions.entity';

export class PermissionsMapper {
  static toDomain(raw: PermissionsEntity): Permissions {
    const domainEntity = new Permissions();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Permissions): PermissionsEntity {
    const persistenceEntity = new PermissionsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
