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
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions } from './domain/permissions';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPermissionsDto } from './dto/find-all-permissions.dto';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Permissions,
  })
  create(@Body() createPermissionsDto: CreatePermissionsDto) {
    return this.permissionsService.create(createPermissionsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Permissions),
  })
  async findAll(
    @Query() query: FindAllPermissionsDto,
  ): Promise<InfinityPaginationResponseDto<Permissions>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.permissionsService.findAllWithPagination({
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
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Permissions,
  })
  findOne(@Param('id') id: number) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Permissions,
  })
  update(
    @Param('id') id: number,
    @Body() updatePermissionsDto: UpdatePermissionsDto,
  ) {
    return this.permissionsService.update(id, updatePermissionsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.permissionsService.remove(id);
  }

  @Get('/roles')
  @ApiOkResponse({
    type: InfinityPaginationResponse(Permissions),
  })
  async findAllRolePermission(
    @Query() query: FindAllPermissionsDto,
  ): Promise<InfinityPaginationResponseDto<Permissions>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.permissionsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
