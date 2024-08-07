import { useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AccountCard } from "../../components/AccountCard";
import { Form } from "../../components/Form";
import { ForgotPasswordFormData, forgotPasswordFormSchema } from "./schemas";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";
import { sendResetPasswordLinkAsync } from "../../services/auth.service";
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
      await sendResetPasswordLinkAsync(formData.email);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "As instruções foram enviadas para o seu email, verifique seu spam",
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

      <Form form={form} onSubmit={handleSendEmailClick}>
        <Form.TextField
          name="email"
          fullWidth
          label="Email"
          type="email"
          margin="dense"
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
      </Form>

      <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
        Voltar
      </Link>
    </AccountCard>
  );
}
