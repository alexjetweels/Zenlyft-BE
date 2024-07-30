import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RolePermissions } from '../../domain/role-permissions';

export abstract class RolePermissionsRepository {
  abstract create(
    data: Omit<RolePermissions, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RolePermissions>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RolePermissions[]>;

  abstract findById(
    id: RolePermissions['id'],
  ): Promise<NullableType<RolePermissions>>;

  abstract update(
    id: RolePermissions['id'],
    payload: DeepPartial<RolePermissions>,
  ): Promise<RolePermissions | null>;

  abstract remove(id: RolePermissions['id']): Promise<void>;
}
