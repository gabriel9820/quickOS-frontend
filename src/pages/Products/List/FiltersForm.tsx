import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { StatusAutocomplete } from "../../../components/Autocomplete/StatusAutocomplete";
import { UnitOfMeasurementAutocomplete } from "../../../components/Autocomplete/UnitOfMeasurementAutocomplete";

export function FiltersForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField name="code" fullWidth label="Código" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField name="name" fullWidth label="Nome" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="sellingPrice"
          fullWidth
          label="Preço de Venda"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="stock"
          fullWidth
          label="Estoque"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <UnitOfMeasurementAutocomplete
          name="unitsOfMeasurement"
          fullWidth
          label="Unidades"
          size="small"
          multiple
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <StatusAutocomplete
          name="isActive"
          fullWidth
          label="Status"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
