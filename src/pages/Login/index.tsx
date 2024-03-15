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

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const hiddenImage = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
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
                image="src/assets/login-image.jpg"
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

              <Box>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="dense"
                />

                <FormControl fullWidth margin="dense">
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                  />
                </FormControl>

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

              <Button fullWidth variant="contained" size="large">
                ENTRAR
              </Button>

              <Link
                variant="overline"
                sx={{ textDecoration: "none" }}
                href="/register"
              >
                Criar uma Conta
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
