export interface PagedResult<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyPagedResult: PagedResult<any> = {
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  totalCount: 0,
  hasPrevious: false,
  hasNext: false,
  data: [],
};
