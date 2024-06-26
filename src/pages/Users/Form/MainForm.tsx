import { useState } from "react";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Form } from "../../../components/Form";
import { MaskInput } from "../../../components/Form/MaskInput";
import { cellphoneMask } from "../../../utils/masks";
import { UserRoleAutocomplete } from "../../../components/Autocomplete/UserRoleAutocomplete";

interface Props {
  creating: boolean;
}

export function MainForm({ creating }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPasswordClick() {
    setShowPassword((show) => !show);
  }

  return (
    <Grid container spacing={2}>
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
          disabled={!creating}
        />
      </Grid>

      {creating && (
        <Grid item xs={12} xl={6}>
          <Form.TextField
            name="password"
            fullWidth
            label="Senha Inicial"
            type={showPassword ? "text" : "password"}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordClick} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}

      <Grid item xs={12} xl={6}>
        <UserRoleAutocomplete
          name="role"
          fullWidth
          label="Função"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isActive" label="Ativo" />
      </Grid>
    </Grid>
  );
}
