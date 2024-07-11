import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { UserAutocomplete } from "../../../components/Autocomplete/UserAutocomplete";
import { CustomerAutocomplete } from "../../../components/Autocomplete/CustomerAutocomplete";
import { ServiceOrderStatusAutocomplete } from "../../../components/Autocomplete/ServiceOrderStatusAutocomplete";

export function FiltersForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField
          name="number"
          fullWidth
          label="Número"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="date"
          fullWidth
          label="Data"
          views={["day", "month", "year"]}
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <ServiceOrderStatusAutocomplete
          name="status"
          fullWidth
          label="Status"
          size="small"
          multiple
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <CustomerAutocomplete
          name="customer"
          fullWidth
          label="Cliente"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <UserAutocomplete
          name="technician"
          fullWidth
          label="Técnico"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
