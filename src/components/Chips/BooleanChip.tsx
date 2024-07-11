import { PropsWithChildren } from "react";
import { Chip } from "@mui/material";

export function BooleanChip({ children }: PropsWithChildren) {
  const color = children ? "success" : "error";
  const label = children ? "Sim" : "Não";

  return <Chip color={color} label={label} variant="outlined"></Chip>;
}
