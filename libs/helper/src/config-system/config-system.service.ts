import { ConsoleLogger, INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StartUrl } from 'libs/constants/enum';
import { configure, getLogger } from 'log4js';

@Injectable()
export class ConfigSystemService {
  setupSwagger(
    app: INestApplication,
    appName: string,
    version: string,
    contact: {
      name: string;
      url: string;
      email: string;
    },
    startUrl: StartUrl,
  ) {
    const documentBuilder = new DocumentBuilder()
      .setTitle(`${appName} api documentation`)
      .setDescription('Develop by Dev grass')
      .setVersion(version)
      .setContact(contact.name, contact.url, contact.email)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup(`${startUrl}/api`, app, document);
  }

  setUpLoggerLog4js() {
    configure({
      appenders: {
        console: {
          type: 'console',
        },
        errorFile: {
          type: 'dateFile',
          filename: 'logs/error.log',
          keepFileExt: true,
          numBackups: 10,
        },
        errors: {
          type: 'logLevelFilter',
          level: 'ERROR',
          appender: 'errorFile',
        },
      },
      categories: {
        default: { appenders: ['console', 'errors'], level: 'debug' },
      },
    });
  }
}

export class LoggingService extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    getLogger(context).error(stack, message);
  }
}
