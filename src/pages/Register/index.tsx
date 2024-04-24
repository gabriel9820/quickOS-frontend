import { Box, Link, Typography } from "@mui/material";

import { AccountCard } from "../../components/AccountCard";

export function RegisterPage() {
  return (
    <AccountCard>
      <Box>
        <Typography variant="h5">CRIAR CONTA</Typography>
      </Box>

      <Box>
        <Link variant="overline" sx={{ textDecoration: "none" }} href="/login">
          Voltar
        </Link>
      </Box>
    </AccountCard>
  );
}
