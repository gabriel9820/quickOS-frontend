import { createReducer, PayloadAction } from "@reduxjs/toolkit";

import {
  changeFiltersProduct,
  changePaginationProduct,
  changeSortingProduct,
  getAllProducts,
} from "./actions";
import { defaultSorting, ProductsReducerProps } from "./constants";
import {
  emptyPagedResult,
  initialPagination,
  PagedResult,
  Pagination,
  Sorting,
} from "../../models/pagination.model";
import { ProductOutputModel } from "../../models/product.model";
import { ProductsFiltersFormData } from "../../pages/Products/List/schemas";

const INITIAL_STATE = {
  pagedResult: emptyPagedResult,
  isLoading: false,
  pagination: initialPagination,
  filters: undefined,
  sorting: defaultSorting,
};

export const productsReducer = createReducer<ProductsReducerProps>(
  INITIAL_STATE,
  (builder) =>
    builder
      .addCase(getAllProducts.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(
        getAllProducts.fulfilled,
        (
          state,
          action: PayloadAction<PagedResult<ProductOutputModel[]> | undefined>
        ) => ({
          ...state,
          pagedResult: action.payload,
          isLoading: false,
        })
      )
      .addCase(
        changePaginationProduct,
        (state, action: PayloadAction<Pagination>) => ({
          ...state,
          pagination: action.payload,
        })
      )
      .addCase(
        changeFiltersProduct,
        (state, action: PayloadAction<ProductsFiltersFormData>) => ({
          ...state,
          filters: action.payload,
        })
      )
      .addCase(
        changeSortingProduct,
        (state, action: PayloadAction<Sorting | undefined>) => ({
          ...state,
          sorting: action.payload || defaultSorting,
        })
      )
);
