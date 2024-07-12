import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { AccountCard } from "../../components/AccountCard";
import { Form } from "../../components/Form";
import { ResetPasswordFormData, resetPasswordFormSchema } from "./schemas";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";
import { resetPasswordAsync } from "../../services/auth.service";
import { addNotification } from "../../store/notification/actions";
import { ResetPasswordInputModel } from "../../models/auth.model";

export function ResetPasswordPage() {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPasswordClick() {
    setShowPassword((show) => !show);
  }

  async function handleResetPasswordClick(formData: ResetPasswordFormData) {
    try {
      const dto: ResetPasswordInputModel = {
        email: searchParams.get("email") || "",
        token: searchParams.get("token") || "",
        newPassword: formData.newPassword,
      };

      setLoading(true);
      await resetPasswordAsync(dto);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "Senha alterada com sucesso",
        })
      );
      navigate("/login");
    } catch (error) {
      setLoading(false);
      handleError(error, dispatch);
    }
  }

  return (
    <AccountCard>
      <Box>
        <Typography variant="h5">REDEFINIR SENHA</Typography>

        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          Digite sua nova senha
        </Typography>
      </Box>

      <Form form={form} onSubmit={handleResetPasswordClick}>
        <Form.TextField
          name="newPassword"
          fullWidth
          label="Nova Senha"
          type={showPassword ? "text" : "password"}
          margin="dense"
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

        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 1 }}
        >
          CONFIRMAR
        </LoadingButton>
      </Form>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
        Voltar
      </Link>
    </AccountCard>
  );
}
