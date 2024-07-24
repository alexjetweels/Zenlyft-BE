import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StartUrl } from 'libs/constants/enum';

export const CmsControllers =
  (controllerName?: string): ClassDecorator =>
  (target: any) => {
    const url = `${StartUrl.CMS}/${controllerName || ''}`;

    ApiTags(url)(target);
    Controller(url)(target);
  };

export const ClientControllers =
  (controllerName?: string): ClassDecorator =>
  (target: any) => {
    const url = `${StartUrl.CLIENT}/${controllerName || ''}`;

    ApiTags(url)(target);
    Controller(url)(target);
  };
