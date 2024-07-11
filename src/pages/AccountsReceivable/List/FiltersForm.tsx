import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { BooleanAutocomplete } from "../../../components/Autocomplete/BooleanAutocomplete";
import { CustomerAutocomplete } from "../../../components/Autocomplete/CustomerAutocomplete";

export function FiltersForm() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="issueDate"
          fullWidth
          label="Data de Emissão"
          views={["day", "month", "year"]}
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="dueDate"
          fullWidth
          label="Data de Vencimento"
          views={["day", "month", "year"]}
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="paymentDate"
          fullWidth
          label="Data de Pagamento"
          views={["day", "month", "year"]}
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="documentNumber"
          fullWidth
          label="Nº Documento"
          size="small"
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
        <BooleanAutocomplete
          name="isPaidOut"
          fullWidth
          label="Pago"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
