import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "../../store/hooks";
import { loginAsync } from "../../services/auth.service";
import { loginUser } from "../../store/auth/actions";
import { CustomForm } from "../../components/Form";
import { LoginFormData, loginFormSchema } from "./schemas";
import { AccountCard } from "../../components/AccountCard";
import { handleError } from "../../utils/error-handler";

export function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleShowPasswordClick() {
    setShowPassword((show) => !show);
  }

  async function handleLoginClick(formData: LoginFormData) {
    try {
      setLoading(true);
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
      <Typography variant="h4">LOGIN</Typography>

      <CustomForm form={form} onSubmit={handleLoginClick}>
        <Box>
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
                />
              ),
            }}
          />

          <CustomForm.Field
            name="password"
            render={{
              uncontrolled: ({ field }) => (
                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <OutlinedInput
                    {...field}
                    id="password"
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleShowPasswordClick}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              ),
            }}
          />

          <Link
            variant="overline"
            sx={{
              float: "right",
              color: "text.primary",
              textDecoration: "none",
              fontSize: 11,
            }}
            href="/forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </Box>

        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 4 }}
        >
          ENTRAR
        </LoadingButton>

        <Link
          variant="overline"
          sx={{ textDecoration: "none" }}
          href="/register"
        >
          Criar uma Conta
        </Link>
      </CustomForm>
    </AccountCard>
  );
}
