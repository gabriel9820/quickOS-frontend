import { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ExpandMore, Search } from "@mui/icons-material";

interface Props extends PropsWithChildren {
  loading: boolean;
  onResetClick: () => void;
}

export function Filters({ children, loading, onResetClick }: Props) {
  return (
    <Accordion
      elevation={0}
      sx={{
        borderRadius: 2,
        "&::before": { backgroundColor: "transparent" },
      }}
    >
      <AccordionSummary sx={{ fontWeight: "500" }} expandIcon={<ExpandMore />}>
        Filtros
      </AccordionSummary>

      <AccordionDetails
        sx={{ padding: 2, borderTop: 1, borderColor: "divider" }}
      >
        {children}
      </AccordionDetails>

      <AccordionActions
        sx={{ padding: 2, borderTop: 1, borderColor: "divider" }}
      >
        <LoadingButton
          variant="outlined"
          color="inherit"
          loading={loading}
          onClick={onResetClick}
        >
          Resetar
        </LoadingButton>

        <LoadingButton
          variant="contained"
          color="info"
          startIcon={<Search />}
          type="submit"
          loading={loading}
        >
          Filtrar
        </LoadingButton>
      </AccordionActions>
    </Accordion>
  );
}
