import { Pagination } from "./pagination.model";

interface AccountPayable {
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  documentNumber?: string;
  description: string;
  value: number;
  isPaidOut: boolean;
}

export interface AccountPayableInputModel extends AccountPayable {}

export interface AccountPayableOutputModel extends AccountPayable {
  externalId: string;
}

export interface AccountPayableQueryParams extends Pagination {
  issueDate?: string;
  dueDate?: string;
  paymentDate?: string;
  documentNumber?: string;
  isPaidOut?: boolean;
}
