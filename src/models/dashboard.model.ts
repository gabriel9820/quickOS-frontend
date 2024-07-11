export interface DashboardOutputModel {
  countCustomers: number;
  countProducts: number;
  countServiceOrders: {
    open: number;
    inProgress: number;
    completed: number;
  };
  countServices: number;
  countUsers: number;
  accountsPayableSum: number;
  accountsReceivableSum: number;
  profit: number;
}

export interface DashboardQueryParams {
  accountsDate: string;
}
