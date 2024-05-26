import { GridSortDirection } from "@mui/x-data-grid";

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

export interface Sorting {
  orderBy: string;
  orderDirection: GridSortDirection;
}

export interface PagedResult<T> extends Pagination {
  totalPages: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}

export const initialPagination: Pagination = {
  currentPage: 0,
  pageSize: 10,
};

export const emptyPagedResult: PagedResult<any> = {
  ...initialPagination,
  totalPages: 0,
  totalCount: 0,
  hasPrevious: false,
  hasNext: false,
  data: [],
};
