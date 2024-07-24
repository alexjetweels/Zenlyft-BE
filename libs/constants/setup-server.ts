import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { json } from 'express';
import { StartUrl } from './enum';
import { ConfigSystemService, LoggingService } from '@app/helper/config-system/config-system.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig, IContact } from './configuration-env';

export async function SetupServerCommon(app: NestExpressApplication, port: number, startUrl: StartUrl) {
  const configService: ConfigService<IConfig> = app.get(ConfigService);
  const configSystemService: ConfigSystemService = app.get(ConfigSystemService);

  const appName = configService.get<string>('appName', '');
  const contact = configService.get<IContact>('contact') || { name: '', email: '', url: '' };
  const logger = new Logger(`${appName}:${startUrl}`);

  configSystemService.setUpLoggerLog4js();
  configSystemService.setupSwagger(app, appName, '1.0', contact, startUrl);
  app.useLogger(new LoggingService());

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(json({ limit: '150mb' }));

  await app.listen(port, () => {
    logger.log(`=== app ${appName} service ${startUrl} running on port: ${port}. pid: ${process.pid} ===`);
  });
}

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//            Phật phù hộ, không bao giờ BUG
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
