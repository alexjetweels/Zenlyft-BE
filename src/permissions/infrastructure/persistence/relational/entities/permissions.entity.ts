import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { RolePermissionsEntity } from '../../../../../role-permissions/infrastructure/persistence/relational/entities/role-permissions.entity';

@Entity({
  name: 'permissions',
})
export class PermissionsEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => RolePermissionsEntity,
    (rolePermissions) => rolePermissions.role,
  )
  rolePermissions: RolePermissionsEntity[];
}
