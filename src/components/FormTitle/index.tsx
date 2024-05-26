import { PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";

export function FormTitle({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 3,
      }}
    >
      <Typography sx={{ fontSize: 26, fontWeight: "bold" }}>
        {children}
      </Typography>
    </Box>
  );
}
