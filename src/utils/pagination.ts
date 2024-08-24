import { IPaginationOptions } from './types/pagination-options';

export const pagination = <T>(data: T[], options: IPaginationOptions) => {
  return {
    data,
    ...options,
  };
};
