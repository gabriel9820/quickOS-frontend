import { useState } from "react";
import { Box, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AccountCard } from "../../components/AccountCard";
import { CustomForm } from "../../components/Form";
import { ForgotPasswordFormData, forgotPasswordFormSchema } from "./schemas";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";
import { forgotPasswordAsync } from "../../services/auth.service";
import { addNotification } from "../../store/notification/actions";

export function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  async function handleSendEmailClick(formData: ForgotPasswordFormData) {
    try {
      setLoading(true);
      await forgotPasswordAsync(formData.email);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "As instruções foram enviadas para o seu email",
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
        <Typography variant="h5">ESQUECEU SUA SENHA?</Typography>

        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          Informe seu email e enviaremos um link para a redefinição da senha.
        </Typography>
      </Box>

      <CustomForm form={form} onSubmit={handleSendEmailClick}>
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

        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 1 }}
        >
          ENVIAR
        </LoadingButton>
      </CustomForm>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
        Voltar
      </Link>
    </AccountCard>
  );
}
