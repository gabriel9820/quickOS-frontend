export interface Pagination {
  currentPage: number;
  pageSize: number;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyPagedResult: PagedResult<any> = {
  ...initialPagination,
  totalPages: 0,
  totalCount: 0,
  hasPrevious: false,
  hasNext: false,
  data: [],
};
