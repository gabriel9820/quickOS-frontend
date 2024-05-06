import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AccountCard } from "../../components/AccountCard";
import { Form } from "../../components/Form";
import { RegisterFormData, registerFormSchema } from "./schemas";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";
import { loginAsync, registerAsync } from "../../services/auth.service";
import { loginUser } from "../../store/auth/actions";
import { MaskInput } from "../../components/Form/MaskInput";
import { cellphoneMask } from "../../utils/masks";

export function RegisterPage() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleShowPasswordClick() {
    setShowPassword((show) => !show);
  }

  async function handleRegisterSubmit(formData: RegisterFormData) {
    try {
      setLoading(true);
      await registerAsync(formData);
      const { data } = await loginAsync(formData.email, formData.password);
      setLoading(false);

      dispatch(loginUser(data));
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      handleError(error, dispatch);
    }
  }

  return (
    <AccountCard>
      <Typography variant="h5">CRIAR CONTA</Typography>

      <Form form={form} onSubmit={handleRegisterSubmit}>
        <Form.UField name="tenantName">
          <TextField
            fullWidth
            label="Nome do Estabelecimento"
            margin="dense"
            size="small"
          />
        </Form.UField>

        <Form.UField name="ownerName">
          <TextField
            fullWidth
            label="Nome do Proprietário"
            margin="dense"
            size="small"
          />
        </Form.UField>

        <Form.UField name="cellphone">
          <TextField
            fullWidth
            label="Celular"
            margin="dense"
            size="small"
            InputProps={{
              inputComponent: MaskInput,
              inputProps: { mask: cellphoneMask },
            }}
          />
        </Form.UField>

        <Form.UField name="email">
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="dense"
            size="small"
          />
        </Form.UField>

        <Form.UField name="password">
          <TextField
            fullWidth
            label="Senha"
            type={showPassword ? "text" : "password"}
            margin="dense"
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
        </Form.UField>

        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 1 }}
        >
          SALVAR
        </LoadingButton>
      </Form>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
        Voltar
      </Link>
    </AccountCard>
  );
}
