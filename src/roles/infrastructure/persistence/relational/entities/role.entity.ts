import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { RolePermissionsEntity } from '../../../../../role-permissions/infrastructure/persistence/relational/entities/role-permissions.entity';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: Number,
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    type: String,
    example: 'admin',
  })
  @Column()
  name?: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(
    () => RolePermissionsEntity,
    (rolePermissions) => rolePermissions.role,
  )
  rolePermissions: RolePermissionsEntity[];
}
