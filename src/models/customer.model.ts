import { CustomerType } from "../enums/customer-type.enum";
import { AddressInputModel, AddressOutputModel } from "./address.model";
import { Pagination } from "./pagination.model";

interface Customer {
  code: number;
  type: CustomerType;
  document: string;
  fullName: string;
  cellphone: string;
  email: string;
  isActive: boolean;
}

export interface CustomerInputModel extends Customer {
  address?: AddressInputModel | null;
}

export interface CustomerOutputModel extends Customer {
  externalId: string;
  address?: AddressOutputModel;
}

export interface CustomerQueryParams extends Pagination {
  code?: number;
  types?: CustomerType[];
  document?: string;
  fullName?: string;
  email?: string;
  isActive?: boolean;
}
