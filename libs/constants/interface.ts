import { UserType } from './enum';

export interface IToken {
  token: string;
  refreshToken: string;
  isFirstLogin?: boolean;
}
export interface IPayloadToken {
  id: number;
  userType: UserType;
  timeStamp: number;
}
export interface IDataTokenForgotPassword {
  email: string;
  timeStamp: number;
  userType: number;
  id: number;
  iat: number;
  exp: number;
}
