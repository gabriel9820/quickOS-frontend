import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";

export function MainForm() {
  return (
    <Grid container spacing={2}>
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
        <Form.TextField
          name="documentNumber"
          fullWidth
          label="Nº Documento"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="description"
          fullWidth
          label="Descrição"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField name="value" fullWidth label="Valor" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isPaidOut" label="Pago" />
      </Grid>
    </Grid>
  );
}
