import { Exception } from '@app/core/exception';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ErrorCustom } from 'libs/constants/enum';

@Injectable()
export class AppService {
  healthCheck(req: Request) {
    return req.ip;
  }
}
