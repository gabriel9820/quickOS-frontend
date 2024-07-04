import { Box, Button, Tab, TabProps } from "@mui/material";
import {
  LoadingButton,
  TabList,
  TabListProps,
  TabPanel,
  TabPanelProps,
} from "@mui/lab";
import { Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function FormTabList({ children, ...props }: TabListProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <TabList {...props}>{children}</TabList>
    </Box>
  );
}

export function FormTab({ children, ...props }: TabProps) {
  return <Tab {...props}>{children}</Tab>;
}

export function FormTabPanel({ children, ...props }: TabPanelProps) {
  return <TabPanel {...props}>{children}</TabPanel>;
}

export interface FormTabActionsProps {
  readOnly: boolean;
  loading?: boolean;
  onSubmitClick?: () => void;
}

export function FormTabActions({
  readOnly,
  loading,
  onSubmitClick,
}: FormTabActionsProps) {
  const navigate = useNavigate();

  function handleCancelClick() {
    navigate(-1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        borderTop: 1,
        borderColor: "divider",
        paddingTop: 3,
      }}
    >
      <Button variant="outlined" color="inherit" onClick={handleCancelClick}>
        {readOnly ? "Voltar" : "Cancelar"}
      </Button>

      {!readOnly && (
        <LoadingButton
          variant="contained"
          color="primary"
          startIcon={<Save />}
          loading={loading}
          type="submit"
          sx={{ marginLeft: 1 }}
          onClick={onSubmitClick}
        >
          Salvar
        </LoadingButton>
      )}
    </Box>
  );
}
