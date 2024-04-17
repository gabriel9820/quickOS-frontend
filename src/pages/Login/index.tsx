import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "../../store/hooks";
import { loginAsync } from "../../services/auth.service";
import { loginUser } from "../../store/auth/actions";
import loginImage from "../../assets/login-image.jpg";
import { CustomForm } from "../../components/Form";
import { LoginFormData, loginFormSchema } from "./schemas";

export function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const hiddenImage = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  function handleShowPasswordClick() {
    setShowPassword((show) => !show);
  }

  async function handleLoginClick(formData: LoginFormData) {
    try {
      const { data } = await loginAsync(formData.email, formData.password);
      dispatch(loginUser(data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container
      fixed
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Card>
        <CardContent
          sx={{
            p: 0,
            "&:last-child": { pb: 0 },
          }}
        >
          <Grid container sx={{ height: 450 }}>
            <Grid
              item
              xs={6}
              sx={{ display: { xs: "none", md: "block" }, background: "#000" }}
            >
              <Link
                variant="overline"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: 11,
                  position: "absolute",
                  zIndex: 1,
                  opacity: "40%",
                  marginLeft: 1,
                }}
                href="https://br.freepik.com/fotos-gratis/o-tecnico-consertando-o-computador-hardware-de-computador-consertando-atualize-e-tecnologia_4334582.htm#fromView=search&page=1&position=5&uuid=6c659287-656b-4e45-9802-0b8049b9008c"
              >
                Imagem de jcomp no Freepik
              </Link>

              <CardMedia
                component="img"
                image={loginImage}
                alt="barbeiro"
                sx={{ height: "100%", opacity: "50%" }}
              />
            </Grid>

            <Grid
              item
              xs={hiddenImage ? 12 : 6}
              sx={{
                px: 4,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "space-around",
              }}
            >
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
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleShowPasswordClick}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Senha"
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

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  ENTRAR
                </Button>

                <Link
                  variant="overline"
                  sx={{ textDecoration: "none" }}
                  href="/register"
                >
                  Criar uma Conta
                </Link>
              </CustomForm>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
