import { UtilsService } from '@app/helper/utils/utils.service';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ValuesImportant } from 'libs/constants/enum';

@Injectable()
export class LoggerReqMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerReqMiddleware.name);

  constructor(private readonly utilsService: UtilsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const body = this.utilsService.hideImportantInformation(req.body, ValuesImportant);

    (async () => {
      try {
        const str = JSON.stringify(body);

        if (str.length < 2000) {
          this.logger.debug(`[${req.method}]-[${req.ip}]: ${req.originalUrl} \n body: ${str}`);
        } else {
          this.logger.debug(`[${req.method}]-[${req.ip}]: ${req.originalUrl} \n body: Body too large`);
        }
      } catch (error) {}
    })();
    next();
  }
}
