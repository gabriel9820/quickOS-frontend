import { Grid, TextareaAutosize } from "@mui/material";

import { Form } from "../../../components/Form";
import { CustomerAutocomplete } from "../../../components/Autocomplete/CustomerAutocomplete";
import { UserAutocomplete } from "../../../components/Autocomplete/UserAutocomplete";
import { ServiceOrderStatusAutocomplete } from "../../../components/Autocomplete/ServiceOrderStatusAutocomplete";

interface IProps {
  creating: boolean;
}

export function MainForm({ creating }: IProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField
          name="number"
          fullWidth
          label="Número"
          size="small"
          disabled={!creating}
        />
      </Grid>

      <Grid xl={6} sx={{ xs: { display: "none" } }}></Grid>

      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="date"
          fullWidth
          label="Data"
          views={["day", "month", "year", "hours", "minutes"]}
          size="small"
          disabled={!creating}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <ServiceOrderStatusAutocomplete
          name="status"
          fullWidth
          label="Status"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <CustomerAutocomplete
          autoFocus
          name="customer"
          fullWidth
          label="Cliente"
          size="small"
          disabled={!creating}
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

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="equipmentDescription"
          fullWidth
          label="Descrição do Equipamento"
          size="small"
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: { minRows: 3 },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="problemDescription"
          fullWidth
          label="Descrição do Problema"
          size="small"
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: { minRows: 3 },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="technicalReport"
          fullWidth
          label="Laudo Técnico"
          size="small"
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: { minRows: 3 },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="totalPrice"
          fullWidth
          label="Valor Total"
          size="small"
          disabled
        />
      </Grid>
    </Grid>
  );
}
