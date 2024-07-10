import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";

export function MainForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Form.TextField
          name="name"
          fullWidth
          label="Nome"
          size="small"
          autoFocus
        />
      </Grid>
    </Grid>
  );
}
