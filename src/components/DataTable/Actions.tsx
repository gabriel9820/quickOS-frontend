import { useState } from "react";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";

import { ConfirmationDialog } from "../ConfirmationDialog";

interface Props {
  onViewClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export function DataTableActions({
  onViewClick,
  onEditClick,
  onDeleteClick,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  function handleDeleteClick() {
    setOpenDialog(true);
  }

  function handleCloseDialog(option: boolean) {
    setOpenDialog(false);

    if (option) {
      onDeleteClick();
    }
  }

  return (
    <Box>
      <GridActionsCellItem
        icon={<Visibility />}
        label="Visualizar"
        onClick={onViewClick}
        color="inherit"
      />
      <GridActionsCellItem
        icon={<Edit />}
        label="Editar"
        onClick={onEditClick}
        color="inherit"
      />
      <GridActionsCellItem
        icon={<Delete />}
        label="Excluir"
        onClick={handleDeleteClick}
        color="inherit"
      />
      <ConfirmationDialog
        open={openDialog}
        text="Tem certeza que deseja excluir este registro?"
        keepMounted
        onClose={handleCloseDialog}
      />
    </Box>
  );
}
