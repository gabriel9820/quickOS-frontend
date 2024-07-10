import { useState } from "react";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Form } from "../../../components/Form";

export function PasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  function handleShowCurrentPasswordClick() {
    setShowCurrentPassword((show) => !show);
  }

  function handleShowNewPasswordClick() {
    setShowNewPassword((show) => !show);
  }
  return (
    <Grid container spacing={2} >
      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="currentPassword"
          fullWidth
          label="Senha Atual"
          type={showCurrentPassword ? "text" : "password"}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowCurrentPasswordClick} edge="end">
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="newPassword"
          fullWidth
          label="Nova Senha"
          type={showNewPassword ? "text" : "password"}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowNewPasswordClick} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}
