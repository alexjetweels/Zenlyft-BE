import { ClientControllers } from '@app/core/decorator/controller-customer.decorator';
import { Public } from '@app/core/decorator/public-api.decorator';
import { Get, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { responseCheckServer } from 'libs/constants/schema';
import { AppService } from './app.service';
import { Request } from 'express';

@ClientControllers()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  @Public()
  @ApiResponse(responseCheckServer)
  healthCheck(@Req() req: Request) {
    return this.appService.healthCheck(req);
  }
}
