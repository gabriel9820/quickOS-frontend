import { Pagination } from "./pagination.model";

interface Service {
  code: number;
  name: string;
  description?: string;
  price: number;
  isActive: boolean;
}

export interface ServiceInputModel extends Service {}

export interface ServiceOutputModel extends Service {
  externalId: string;
}

export interface ServiceQueryParams extends Pagination {}
