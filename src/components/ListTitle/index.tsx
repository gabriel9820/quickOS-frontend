import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

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
        marginBottom: 2,
      }}
    >
      <Typography sx={{ fontSize: 28 }}>{children}</Typography>

      <Button variant="contained" onClick={handleAddClick}>
        Adicionar
      </Button>
    </Box>
  );
}
