import { useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";

import { ConfirmationDialog } from "../ConfirmationDialog";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../store/hooks";
import { isInRole } from "../../utils/auth";

export interface DataTableActionsProps {
  viewPermission?: UserRole[];
  editPermission?: UserRole[];
  deletePermission?: UserRole[];
  onViewClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => Promise<void>;
}

export function DataTableActions({
  viewPermission,
  editPermission,
  deletePermission,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: DataTableActionsProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const hasViewPermission = isInRole(viewPermission, user!);
  const hasEditPermission = isInRole(editPermission, user!);
  const hasDeletePermission = isInRole(deletePermission, user!);

  function handleDeleteClick() {
    setOpenDialog(true);
  }

  async function handleCloseDialog(confirmed: boolean) {
    if (confirmed) {
      setLoading(true);
      await onDeleteClick();
      setLoading(false);
    }

    setOpenDialog(false);
  }

  return (
    <Box>
      <Tooltip title={hasViewPermission ? "" : "Sem permissão"}>
        <span>
          <GridActionsCellItem
            disabled={!hasViewPermission}
            icon={<Visibility />}
            label="Visualizar"
            onClick={onViewClick}
            color="inherit"
          />
        </span>
      </Tooltip>

      <Tooltip title={hasEditPermission ? "" : "Sem permissão"}>
        <span>
          <GridActionsCellItem
            disabled={!hasEditPermission}
            icon={<Edit />}
            label="Editar"
            onClick={onEditClick}
            color="inherit"
          />
        </span>
      </Tooltip>

      <Tooltip title={hasDeletePermission ? "" : "Sem permissão"}>
        <span>
          <GridActionsCellItem
            disabled={!hasDeletePermission}
            icon={<Delete />}
            label="Excluir"
            onClick={handleDeleteClick}
            color="inherit"
          />
        </span>
      </Tooltip>

      <ConfirmationDialog
        open={openDialog}
        keepMounted
        text="Tem certeza que deseja excluir este registro?"
        loading={loading}
        onClose={handleCloseDialog}
      />
    </Box>
  );
}
