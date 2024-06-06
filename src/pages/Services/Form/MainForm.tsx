import { Grid, TextareaAutosize } from "@mui/material";

import { Form } from "../../../components/Form";

export function MainForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField name="code" fullWidth label="Código" size="small" />
      </Grid>

      <Grid xl={6} sx={{ xs: { display: "none" } }}></Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="name"
          fullWidth
          label="Nome"
          size="small"
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField name="price" fullWidth label="Valor" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="description"
          fullWidth
          label="Descrição"
          size="small"
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isActive" label="Ativo" />
      </Grid>
    </Grid>
  );
}
