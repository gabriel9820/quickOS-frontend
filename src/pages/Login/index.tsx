import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, Link, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "../../store/hooks";
import { loginAsync } from "../../services/auth.service";
import { loginUser } from "../../store/auth/actions";
import { Form } from "../../components/Form";
import { LoginFormData, loginFormSchema } from "./schemas";
import { AccountCard } from "../../components/AccountCard";
import { handleError } from "../../utils/error-handler";

export function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "usuario@administrador.com",
      password: "Teste@123",
    },
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

      <Form form={form} onSubmit={handleLoginClick}>
        <Form.TextField
          name="email"
          fullWidth
          label="Email"
          type="email"
          margin="dense"
        />

        <Form.TextField
          name="password"
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
      </Form>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/register">
        Criar Conta
      </Link>
    </AccountCard>
  );
}
