import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface Props {
  open: boolean;
  text: string;
  keepMounted: boolean;
  onClose: (option: boolean) => void;
}

export function ConfirmationDialog({ open, text, onClose, ...props }: Props) {
  function handleCancel() {
    onClose(false);
  }

  function handleOk() {
    onClose(true);
  }

  return (
    <Dialog open={open} {...props}>
      <DialogTitle>Confirmação</DialogTitle>

      <DialogContent dividers>{text}</DialogContent>

      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
        >
          Não
        </Button>

        <Button variant="contained" color="primary" onClick={handleOk}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
