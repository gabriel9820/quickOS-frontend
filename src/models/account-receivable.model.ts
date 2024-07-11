import { CustomerOutputModel } from "./customer.model";
import { Pagination } from "./pagination.model";

interface AccountReceivable {
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  documentNumber?: string;
  description: string;
  value: number;
  isPaidOut: boolean;
}

export interface AccountReceivableInputModel extends AccountReceivable {
  customer?: string;
}

export interface AccountReceivableOutputModel extends AccountReceivable {
  externalId: string;
  customer?: CustomerOutputModel;
}

export interface AccountReceivableQueryParams extends Pagination {
  issueDate?: string;
  dueDate?: string;
  paymentDate?: string;
  documentNumber?: string;
  isPaidOut?: boolean;
  customer?: string;
}
