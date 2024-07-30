import { Injectable } from '@nestjs/common';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { PermissionsRepository } from './infrastructure/persistence/permissions.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Permissions } from './domain/permissions';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  create(createPermissionsDto: CreatePermissionsDto) {
    return this.permissionsRepository.create(createPermissionsDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.permissionsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Permissions['id']) {
    return this.permissionsRepository.findById(id);
  }

  update(id: Permissions['id'], updatePermissionsDto: UpdatePermissionsDto) {
    return this.permissionsRepository.update(id, updatePermissionsDto);
  }

  remove(id: Permissions['id']) {
    return this.permissionsRepository.remove(id);
  }
}
