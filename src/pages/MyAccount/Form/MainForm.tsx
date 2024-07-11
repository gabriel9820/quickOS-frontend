import { Grid } from "@mui/material";

import { Form } from "../../../components/Form";
import { MaskInput } from "../../../components/Form/MaskInput";
import { cellphoneMask } from "../../../utils/masks";
import { UserRoleAutocomplete } from "../../../components/Autocomplete/UserRoleAutocomplete";

export function MainForm() {
  return (
    <Grid container spacing={2} >
      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="fullName"
          fullWidth
          label="Nome"
          size="small"
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="cellphone"
          fullWidth
          label="Celular"
          size="small"
          InputProps={{
            inputComponent: MaskInput,
            inputProps: { mask: cellphoneMask },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="email"
          fullWidth
          label="Email"
          type="email"
          size="small"
          disabled
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <UserRoleAutocomplete
          name="role"
          fullWidth
          label="Função"
          size="small"
          disabled
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isActive" label="Ativo" disabled />
      </Grid>
    </Grid>
  );
}
