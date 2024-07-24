export enum StartUrl {
  CLIENT = 'client',
  CMS = 'cms',
}
export enum CommonStatus {
  IN_ACTIVE = 0,
  ACTIVE = 1,
}
export enum UserStatus {
  IN_ACTIVE = 0,
  USE_FREE = 1,
  PENDING = 2,
  ACTIVE = 3,
}
export enum UserType {
  SUPER_ADMIN = 1,
  CLIENT = 2,
}
export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Test = 'test',
}
export const ErrorCustom = {
  Test: {
    ErrorCode: 'Test',
    ErrorMessage: '{x}',
  },
  Unauthorized: {
    ErrorCode: 'Unauthorized',
    ErrorMessage: 'Unauthorized',
  },
  Invalid_Input: {
    ErrorCode: 'Invalid_Input',
    ErrorMessage: 'Invalid_Input',
  },
  Not_Found: {
    ErrorCode: 'Not_Found',
    ErrorMessage: 'Not_Found',
  },
  Unknown_Error: {
    ErrorCode: 'Unknown_Error',
    ErrorMessage: 'Unknown_Error',
  },
  The_Allowed_Number_Of_Calls_Has_Been_Exceeded: {
    ErrorCode: 'The_Allowed_Number_Of_Calls_Has_Been_Exceeded',
    ErrorMessage: 'The_Allowed_Number_Of_Calls_Has_Been_Exceeded',
  },
  Forbidden_Resource: {
    ErrorCode: 'Forbidden_Resource',
    ErrorMessage: 'Forbidden_Resource',
  },
};
export type ErrorValues = (typeof ErrorCustom)[keyof typeof ErrorCustom];
export const ValuesImportant = ['password', 'refreshToken', 'oldPassword', 'newPassword'];
export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
