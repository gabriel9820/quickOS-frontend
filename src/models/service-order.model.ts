import { ServiceOrderStatus } from "../enums/service-order-status.enum";
import { CustomerOutputModel } from "./customer.model";
import { Pagination } from "./pagination.model";
import { ServiceOutputModel } from "./service.model";
import { UserOutputModel } from "./user.model";

interface ServiceOrder {
  number: number;
  date: Date;
  status: ServiceOrderStatus;
  equipmentDescription?: string;
  problemDescription?: string;
  technicalReport?: string;
}

export interface ServiceOrderInputModel extends ServiceOrder {
  customer: string;
  technician: string;
  services: ServiceOrderServiceInputModel[];
}

export interface ServiceOrderOutputModel extends ServiceOrder {
  externalId: string;
  customer: CustomerOutputModel;
  technician: UserOutputModel;
  totalPrice: number;
  services: ServiceOrderServiceOutputModel[];
}

export interface ServiceOrderQueryParams extends Pagination {
  number?: number;
  date?: string;
  status?: ServiceOrderStatus[];
  customer?: string;
  technician?: string;
}

interface ServiceOrderService {
  externalId?: string;
  item: number;
  quantity: number;
  price: number;
}

export interface ServiceOrderServiceInputModel extends ServiceOrderService {
  service: string;
}

export interface ServiceOrderServiceOutputModel extends ServiceOrderService {
  service: Partial<ServiceOutputModel>;
  totalPrice: number;
}
