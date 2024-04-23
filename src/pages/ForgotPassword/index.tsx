import { Box, Button, Link, TextField, Typography } from "@mui/material";
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

  async function handleSendEmailClick(formData: ForgotPasswordFormData) {
    try {
      await forgotPasswordAsync(formData.email);
      dispatch(
        addNotification({
          type: "success",
          message: "As instruções foram enviadas para o seu email",
        })
      );
      navigate("/login");
    } catch (error) {
      handleError(error, dispatch);
    }
  }

  return (
    <AccountCard>
      <Box>
        <Typography variant="h4">Esqueceu sua senha?</Typography>

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

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 1 }}
        >
          ENVIAR EMAIL
        </Button>
      </CustomForm>

      <Box>
        <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
          Voltar
        </Link>
      </Box>
    </AccountCard>
  );
}
