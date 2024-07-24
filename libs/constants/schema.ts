import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
export const responseSuccessBasic: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: true,
    },
  },
};

export const responseCheckServer: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response check server example',
  schema: {
    example: {
      data: '222.252.27.11',
    },
  },
};

export const responseRefreshToken: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response check refresh token api',
  schema: {
    example: {
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VyVHlwZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNjcwNDY1MTE1LCJleHAiOjE2NzMwNTcxMTV9.dwSE0lmdCSiK5OLIU3FxsKBmiPvKpXiKnbUZpQ4uKLc',
    },
  },
};

