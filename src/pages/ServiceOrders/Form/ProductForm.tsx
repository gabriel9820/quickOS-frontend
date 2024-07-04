import { Dispatch, SetStateAction } from "react";
import { Box, Button, Grid } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { useFormContext } from "react-hook-form";

import { Form } from "../../../components/Form";
import { DataTable } from "../../../components/DataTable";
import { productColumns } from "./constants";
import { ServiceOrdersProductFormData } from "./schemas";
import { ServiceOrderProductOutputModel } from "../../../models/service-order.model";
import { ProductAutocomplete } from "../../../components/Autocomplete/ProductAutocomplete";

interface Props {
  products: ServiceOrderProductOutputModel[];
  setProducts: Dispatch<SetStateAction<ServiceOrderProductOutputModel[]>>;
}

export function ProductForm({ products, setProducts }: Props) {
  const formProduct = useFormContext<ServiceOrdersProductFormData>();

  async function handleAddClick() {
    const isValid = await formProduct.trigger();

    if (!isValid) return;

    const formProductData = formProduct.getValues();

    setProducts((oldState) => [
      ...oldState,
      {
        item: oldState.length + 1,
        product: formProductData.product,
        quantity: formProductData.quantity,
        price: formProductData.price,
        totalPrice: formProductData.quantity * formProductData.price,
      },
    ]);

    formProduct.reset();
  }

  function handleDeleteClick(id: GridRowId) {
    setProducts((oldState) =>
      oldState
        .filter((s) => s.item !== id)
        .map((s, index) => ({ ...s, item: index + 1 }))
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={6}>
          <ProductAutocomplete
            name="product"
            fullWidth
            label="Produto"
            size="small"
            onChange={(_, value: any) => {
              if (value) {
                formProduct.setValue("price", value.sellingPrice);
                formProduct.setFocus("quantity");
              } else {
                formProduct.resetField("price");
              }
            }}
          />
        </Grid>

        <Grid item xs={12} xl={3}>
          <Form.DecimalField
            name="price"
            fullWidth
            label="Valor"
            size="small"
          />
        </Grid>

        <Grid item xs={12} xl={3}>
          <Form.DecimalField
            name="quantity"
            fullWidth
            label="Quantidade"
            size="small"
          />
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        onClick={handleAddClick}
        disabled={formProduct.formState.disabled}
        sx={{ marginY: 2 }}
      >
        Adicionar Produto
      </Button>

      <DataTable
        rows={products}
        columns={productColumns}
        hideFooter
        rowSelection={false}
        sortingMode="client"
        paginationMode="client"
        getRowId={(row) => row.item}
        renderActions={({ id }) => (
          <DataTable.Actions
            onDeleteClick={
              formProduct.formState.disabled
                ? undefined
                : () => handleDeleteClick(id)
            }
          />
        )}
      />
    </Box>
  );
}
