import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { StatusAutocomplete } from "../../../components/Autocomplete/StatusAutocomplete";
import { UserRoleAutocomplete } from "../../../components/Autocomplete/UserRoleAutocomplete";

export function FiltersForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={6}>
        <Form.TextField name="fullName" fullWidth label="Nome" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField name="email" fullWidth label="Email" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <UserRoleAutocomplete
          name="roles"
          fullWidth
          label="Função"
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
