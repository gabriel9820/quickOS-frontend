import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { StatusAutocomplete } from "../../../components/Autocomplete/StatusAutocomplete";

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
        <Form.DecimalField name="price" fullWidth label="Valor" size="small" />
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
