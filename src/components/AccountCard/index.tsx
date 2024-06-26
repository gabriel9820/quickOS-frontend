import { PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Theme,
  useMediaQuery,
} from "@mui/material";

import loginImage from "../../assets/login-image.jpg";

export function AccountCard({ children }: PropsWithChildren) {
  const hiddenImage = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

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
          <Grid container sx={{ height: 500 }}>
            <Grid
              item
              xs={6}
              sx={{
                display: { xs: "none", md: "block" },
                background: "#000",
                width: 500,
              }}
            >
              <Link
                variant="overline"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  fontSize: 10,
                  position: "absolute",
                  zIndex: 1,
                  opacity: "40%",
                  marginLeft: 1,
                }}
                href="https://br.freepik.com/fotos-gratis/o-tecnico-consertando-o-computador-hardware-de-computador-consertando-atualize-e-tecnologia_4334590.htm#fromView=search&page=1&position=11&uuid=4525a991-300f-46ce-8a1b-2579bfe8f493"
              >
                Imagem de jcomp no Freepik
              </Link>

              <CardMedia
                component="img"
                image={loginImage}
                alt="barbeiro"
                sx={{ height: "100%", opacity: "40%" }}
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
                width: 600,
              }}
            >
              {children}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
