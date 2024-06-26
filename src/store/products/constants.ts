import {
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { ProductOutputModel } from "../../models/product.model";
import { ProductsFiltersFormData } from "../../pages/Products/List/schemas";

export interface ProductsReducerProps {
  pagedResult: PagedResult<ProductOutputModel[]> | undefined;
  isLoading: boolean;
  pagination: Pagination;
  filters: ProductsFiltersFormData | undefined;
  sorting: Sorting;
}

export const defaultSorting: Sorting = {
  orderBy: "name",
  orderDirection: "asc",
};
