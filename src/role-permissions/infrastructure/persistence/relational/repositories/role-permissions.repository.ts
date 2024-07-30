import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionsEntity } from '../entities/role-permissions.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RolePermissions } from '../../../../domain/role-permissions';
import { RolePermissionsRepository } from '../../role-permissions.repository';
import { RolePermissionsMapper } from '../mappers/role-permissions.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RolePermissionsRelationalRepository
  implements RolePermissionsRepository
{
  constructor(
    @InjectRepository(RolePermissionsEntity)
    private readonly rolePermissionsRepository: Repository<RolePermissionsEntity>,
  ) {}

  async create(data: RolePermissions): Promise<RolePermissions> {
    const persistenceModel = RolePermissionsMapper.toPersistence(data);
    const newEntity = await this.rolePermissionsRepository.save(
      this.rolePermissionsRepository.create(persistenceModel),
    );
    return RolePermissionsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RolePermissions[]> {
    const entities = await this.rolePermissionsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => RolePermissionsMapper.toDomain(user));
  }

  async findById(
    id: RolePermissions['id'],
  ): Promise<NullableType<RolePermissions>> {
    const entity = await this.rolePermissionsRepository.findOne({
      where: { id },
    });

    return entity ? RolePermissionsMapper.toDomain(entity) : null;
  }

  async update(
    id: RolePermissions['id'],
    payload: Partial<RolePermissions>,
  ): Promise<RolePermissions> {
    const entity = await this.rolePermissionsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rolePermissionsRepository.save(
      this.rolePermissionsRepository.create(
        RolePermissionsMapper.toPersistence({
          ...RolePermissionsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RolePermissionsMapper.toDomain(updatedEntity);
  }

  async remove(id: RolePermissions['id']): Promise<void> {
    await this.rolePermissionsRepository.delete(id);
  }
}
