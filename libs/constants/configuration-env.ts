require('dotenv').config();
import { DataSource } from 'typeorm';
export default (): {} => ({
  nodeEnv: process.env.NODE_ENV,
  portClient: Number(process.env.SERVER_PORT_CLIENT) || 3000,
  portCms: Number(process.env.SERVER_PORT_CMS) || 3001,

  appName: String(process.env.APP_NAME),
  contact: {
    name: process.env.CONTACT_NAME,
    url: process.env.CONTACT_URL,
    email: process.env.CONTACT_EMAIL,
  },
  auth: {
    secretOrKey: process.env.JWT_SECRET_KEY,
    accessTokenExpiredIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '10d',
    refreshTokenExpiredIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '30d',
    saltRound: Number(process.env.BCRYPT_HASH_ROUNDS),
  },
});

export interface IContact {
  name: string;
  url: string;
  email: string;
}

export interface IConfigAuth {
  secretOrKey: string;
  accessTokenExpiredIn: string;
  refreshTokenExpiredIn: string;
  saltRound: number;
}

export interface IConfig {
  nodeEnv: string;
  portCommon: number;
  portClient: number;
  appName: string;
  contact: IContact;
  typeORMOptions: typeof DataSource;
  auth: IConfigAuth;
}
