import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Permissions } from '../../../../domain/permissions';
import { PermissionsRepository } from '../../permissions.repository';
import { PermissionsMapper } from '../mappers/permissions.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PermissionsRelationalRepository implements PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>,
  ) {}

  async create(data: Permissions): Promise<Permissions> {
    const persistenceModel = PermissionsMapper.toPersistence(data);
    const newEntity = await this.permissionsRepository.save(
      this.permissionsRepository.create(persistenceModel),
    );
    return PermissionsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Permissions[]> {
    const entities = await this.permissionsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => PermissionsMapper.toDomain(user));
  }

  async findById(id: Permissions['id']): Promise<NullableType<Permissions>> {
    const entity = await this.permissionsRepository.findOne({
      where: { id },
    });

    return entity ? PermissionsMapper.toDomain(entity) : null;
  }

  async update(
    id: Permissions['id'],
    payload: Partial<Permissions>,
  ): Promise<Permissions> {
    const entity = await this.permissionsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.permissionsRepository.save(
      this.permissionsRepository.create(
        PermissionsMapper.toPersistence({
          ...PermissionsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PermissionsMapper.toDomain(updatedEntity);
  }

  async remove(id: Permissions['id']): Promise<void> {
    await this.permissionsRepository.delete(id);
  }
}
