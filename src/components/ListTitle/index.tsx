import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../store/hooks";
import { isInRole } from "../../utils/auth";

interface Props extends PropsWithChildren {
  createPermission?: UserRole[];
}

export function ListTitle({ createPermission, children }: Props) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const hasCreatePermission = isInRole(createPermission, user!);

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

      <Tooltip title={hasCreatePermission ? "" : "Sem permissão"}>
        <span>
          <Button
            disabled={!hasCreatePermission}
            variant="contained"
            onClick={handleAddClick}
            startIcon={<Add />}
          >
            Adicionar
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
