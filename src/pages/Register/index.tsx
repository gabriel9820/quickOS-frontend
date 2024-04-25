import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AccountCard } from "../../components/AccountCard";
import { CustomForm } from "../../components/Form";
import { RegisterFormData, registerFormSchema } from "./schemas";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";
import { loginAsync, registerAsync } from "../../services/auth.service";
import { loginUser } from "../../store/auth/actions";

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

      <CustomForm form={form} onSubmit={handleRegisterSubmit}>
        <CustomForm.Field
          name="tenantName"
          render={{
            uncontrolled: ({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome do Estabelecimento"
                margin="dense"
                size="small"
              />
            ),
          }}
        />

        <CustomForm.Field
          name="ownerName"
          render={{
            uncontrolled: ({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome do Proprietário"
                margin="dense"
                size="small"
              />
            ),
          }}
        />

        <CustomForm.Field
          name="cellphone"
          render={{
            uncontrolled: ({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Celular"
                margin="dense"
                size="small"
              />
            ),
          }}
        />

        <CustomForm.Field
          name="email"
          render={{
            uncontrolled: ({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                margin="dense"
                size="small"
              />
            ),
          }}
        />

        <CustomForm.Field
          name="password"
          render={{
            uncontrolled: ({ field }) => (
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel htmlFor="password">Senha</InputLabel>
                <OutlinedInput
                  {...field}
                  id="password"
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordClick} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            ),
          }}
        />

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
      </CustomForm>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
        Voltar
      </Link>
    </AccountCard>
  );
}
