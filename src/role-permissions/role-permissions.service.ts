import { Injectable } from '@nestjs/common';
import { CreateRolePermissionsDto } from './dto/create-role-permissions.dto';
import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';
import { RolePermissionsRepository } from './infrastructure/persistence/role-permissions.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RolePermissions } from './domain/role-permissions';

@Injectable()
export class RolePermissionsService {
  constructor(
    private readonly rolePermissionsRepository: RolePermissionsRepository,
  ) {}

  create(createRolePermissionsDto: CreateRolePermissionsDto) {
    return this.rolePermissionsRepository.create(createRolePermissionsDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rolePermissionsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: RolePermissions['id']) {
    return this.rolePermissionsRepository.findById(id);
  }

  update(
    id: RolePermissions['id'],
    updateRolePermissionsDto: UpdateRolePermissionsDto,
  ) {
    return this.rolePermissionsRepository.update(id, updateRolePermissionsDto);
  }

  remove(id: RolePermissions['id']) {
    return this.rolePermissionsRepository.remove(id);
  }
}
