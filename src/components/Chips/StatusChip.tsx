import { PropsWithChildren } from "react";
import { Chip } from "@mui/material";

export function StatusChip({ children }: PropsWithChildren) {
  const color = children ? "success" : "error";
  const label = children ? "Ativo" : "Inativo";

  return <Chip color={color} label={label} variant="outlined"></Chip>;
}
