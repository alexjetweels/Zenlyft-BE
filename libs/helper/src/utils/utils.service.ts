import { IFormatErrorObject } from '@app/core/filters/http-exeption.filter';
import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, ErrorCustom } from 'libs/constants/enum';

@Global()
@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}
  
  format(template: string, ...args: Array<{ [k: string]: any } | string>): string {
    return template.replace(/{(.*?)}/g, (match, key) => {
      const value = args.find((arg) => typeof arg === 'object' && arg.hasOwnProperty(key));
      return value ? value[key] : '';
    });
  }

  hideImportantInformation(data: any, keys: string[]) {
    const result = JSON.parse(JSON.stringify(data));
    keys.forEach((key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = '************************';
      }
    });

    return result;
  }
  deepClone(object: Object) {
    if (typeof object !== 'object' || !object) {
      return object;
    }

    const clonedObject = Array.isArray(object) ? [] : {};

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key] instanceof Date) {
          clonedObject[key] = new Date(object[key]);
        } else {
          clonedObject[key] = this.deepClone(object[key]);
        }
      }
    }

    return clonedObject;
  }
  omitObject(object: Object, omits: string[]) {
    const objectCopy = this.deepClone(object);

    omits.forEach((key) => {
      delete objectCopy[key];
    });

    return objectCopy;
  }

  pickObject(object: Object, picks: string[]) {
    const objectCopy = this.deepClone(object);

    picks.forEach((key) => {
      if (!picks.includes(key)) delete objectCopy[key];
    });

    return objectCopy;
  }
  async formatErrorObject(exception: HttpException | any): Promise<any> {
    const errorObj: IFormatErrorObject = {
      success: false,
      statusCode: exception.status || HttpStatus.BAD_REQUEST,
      errorValue: ErrorCustom.Unknown_Error,
      devMessage: undefined,
      payload: undefined,
    };

    if (exception instanceof HttpException) {
      const data = exception instanceof HttpException ? (exception.getResponse() as any) : exception['error'];

      if (data?.error === 'Not Found') {
        return {
          success: false,
          statusCode: data?.status || HttpStatus.BAD_REQUEST,
          errorCode: ErrorCustom.Not_Found.ErrorCode,
          errorMessage: data?.message || ErrorCustom.Not_Found.ErrorMessage,
        };
      }

      if (data?.error === 'Bad Request') {
        return {
          success: false,
          statusCode: data?.status || HttpStatus.BAD_REQUEST,
          errorCode: ErrorCustom.Invalid_Input.ErrorCode,
          errorMessage: data?.message || ErrorCustom.Invalid_Input.ErrorMessage,
        };
      }

      const extraData = this.pickObject(data, ['errorValue', 'statusCode', 'devMessage', 'payload', 'errorMessage']);

      Object.assign(errorObj, extraData);

      if (data === 'ThrottlerException: Too Many Requests') {
        Object.assign(errorObj, {
          errorValue: ErrorCustom.The_Allowed_Number_Of_Calls_Has_Been_Exceeded,
          devMessage: 'Too Many Requests',
        });
      }
    }

    const errorValue = errorObj.errorValue;

    // const errorMessageFormat = await this.globalCacheService.getErrMessage();
    const errorMessageFormat = {};

    errorObj.errorMessage = errorMessageFormat[errorValue.ErrorCode]?.message || errorValue.ErrorMessage;
    errorObj.errorCode = errorValue.ErrorCode;

    const keyOmit = ['errorValue'];
    if (this.configService.get<Environment>('nodeEnv', Environment.Development) === Environment.Production) {
      keyOmit.push('devMessage');
    }

    if (errorObj.errorMessage) {
      errorObj.errorMessage = this.format(errorObj.errorMessage, errorObj.payload);
    }

    if (errorObj.devMessage) {
      errorObj.devMessage = this.format(errorObj.devMessage, errorObj.payload);
    }
    return this.omitObject(errorObj, ['errorValue']) as any;
  }
}
