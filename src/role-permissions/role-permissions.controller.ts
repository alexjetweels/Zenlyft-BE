import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionsDto } from './dto/create-role-permissions.dto';
import { UpdateRolePermissionsDto } from './dto/update-role-permissions.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RolePermissions } from './domain/role-permissions';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRolePermissionsDto } from './dto/find-all-role-permissions.dto';

@ApiTags('Rolepermissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'role-permissions',
  version: '1',
})
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: RolePermissions,
  })
  create(@Body() createRolePermissionsDto: CreateRolePermissionsDto) {
    return this.rolePermissionsService.create(createRolePermissionsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RolePermissions),
  })
  async findAll(
    @Query() query: FindAllRolePermissionsDto,
  ): Promise<InfinityPaginationResponseDto<RolePermissions>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rolePermissionsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  @ApiOkResponse({
    type: RolePermissions,
  })
  findOne(@Param('id') id: number) {
    return this.rolePermissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RolePermissions,
  })
  update(
    @Param('id') id: string,
    @Body() updateRolePermissionsDto: UpdateRolePermissionsDto,
  ) {
    return this.rolePermissionsService.update(
      Number(id),
      updateRolePermissionsDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.rolePermissionsService.remove(id);
  }
}
