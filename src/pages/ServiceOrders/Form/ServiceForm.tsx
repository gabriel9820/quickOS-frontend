import { Dispatch, SetStateAction } from "react";
import { Box, Button, Grid } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { useFormContext } from "react-hook-form";

import { Form } from "../../../components/Form";
import { DataTable } from "../../../components/DataTable";
import { serviceColumns } from "./constants";
import { ServiceOrdersServiceFormData } from "./schemas";
import { ServiceOrderServiceOutputModel } from "../../../models/service-order.model";
import { ServiceAutocomplete } from "../../../components/Autocomplete/ServiceAutocomplete";

interface Props {
  services: ServiceOrderServiceOutputModel[];
  setServices: Dispatch<SetStateAction<ServiceOrderServiceOutputModel[]>>;
}

export function ServiceForm({ services, setServices }: Props) {
  const formService = useFormContext<ServiceOrdersServiceFormData>();

  async function handleAddClick() {
    const isValid = await formService.trigger();

    if (!isValid) return;

    const formServiceData = formService.getValues();

    setServices((oldState) => [
      ...oldState,
      {
        item: oldState.length + 1,
        service: formServiceData.service,
        quantity: formServiceData.quantity,
        price: formServiceData.price,
        totalPrice: formServiceData.quantity * formServiceData.price,
      },
    ]);

    formService.reset();
  }

  function handleDeleteClick(id: GridRowId) {
    setServices((oldState) =>
      oldState
        .filter((s) => s.item !== id)
        .map((s, index) => ({ ...s, item: index + 1 }))
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} xl={6}>
          <ServiceAutocomplete
            name="service"
            fullWidth
            label="Serviço"
            size="small"
            onChange={(_, value: any) => {
              if (value) {
                formService.setValue("price", value.price);
                formService.setFocus("quantity");
              } else {
                formService.resetField("price");
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
        disabled={formService.formState.disabled}
        sx={{ marginY: 2 }}
      >
        Adicionar Serviço
      </Button>

      <DataTable
        rows={services}
        columns={serviceColumns}
        hideFooter
        rowSelection={false}
        sortingMode="client"
        paginationMode="client"
        getRowId={(row) => row.item}
        renderActions={({ id }) => (
          <DataTable.Actions
            onDeleteClick={
              formService.formState.disabled
                ? undefined
                : () => handleDeleteClick(id)
            }
          />
        )}
      />
    </Box>
  );
}
