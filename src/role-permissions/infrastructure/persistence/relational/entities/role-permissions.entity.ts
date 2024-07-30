import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { PermissionsEntity } from '../../../../../permissions/infrastructure/persistence/relational/entities/permissions.entity';

@Entity({
  name: 'role_permissions',
})
export class RolePermissionsEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ name: 'role_id' })
  roleId: number;

  @ApiProperty()
  @Column({ name: 'permission_id' })
  permissionId: number;

  @ApiProperty()
  @Column({ name: 'status', comment: '1: ACTIVE, 0: INACTIVE', default: 1 })
  status: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.rolePermissions)
  public role: RoleEntity;

  @ManyToOne(
    () => PermissionsEntity,
    (permission) => permission.rolePermissions,
  )
  public permission: PermissionsEntity;
}
