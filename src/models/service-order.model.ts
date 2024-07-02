import { ServiceOrderStatus } from "../enums/service-order-status.enum";
import { CustomerOutputModel } from "./customer.model";
import { Pagination } from "./pagination.model";
import { UserOutputModel } from "./user.model";

interface ServiceOrder {
  number: number;
  date: Date;
  status: ServiceOrderStatus;
  equipmentDescription?: string;
  problemDescription?: string;
  technicalReport?: string;
  totalPrice: number;
}

export interface ServiceOrderInputModel extends ServiceOrder {
  customer: string;
  technician: string;
}

export interface ServiceOrderOutputModel extends ServiceOrder {
  externalId: string;
  customer: CustomerOutputModel;
  technician: UserOutputModel;
}

export interface ServiceOrderQueryParams extends Pagination {
  number?: number;
  date?: Date;
  status?: ServiceOrderStatus[];
  customer?: string;
  technician?: string;
}
