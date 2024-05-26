import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export function ListTitle({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  function handleAddClick() {
    navigate("create");
  }

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

      <Button variant="contained" onClick={handleAddClick} startIcon={<Add />}>
        Adicionar
      </Button>
    </Box>
  );
}
