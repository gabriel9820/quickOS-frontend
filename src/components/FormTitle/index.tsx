import { PropsWithChildren } from "react";
import { Typography } from "@mui/material";

export function FormTitle({ children }: PropsWithChildren) {
  return (
    <Typography sx={{ fontSize: 28, marginBottom: 2 }}>{children}</Typography>
  );
}
