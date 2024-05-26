import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  keepMounted: boolean;
  text: string;
  loading?: boolean;
  onClose: (option: boolean) => void;
}

export function ConfirmationDialog({
  text,
  loading,
  onClose,
  ...props
}: Props) {
  function handleCancel() {
    onClose(false);
  }

  function handleOk() {
    onClose(true);
  }

  return (
    <Dialog {...props}>
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

        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          onClick={handleOk}
        >
          Sim
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
