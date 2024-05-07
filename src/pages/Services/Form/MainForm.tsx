import { Box } from "@mui/material";

import { Form } from "../../../components/Form";

export function MainForm() {
  return (
    <Box>
      <Form.TextField
        name="code"
        fullWidth
        label="Código"
        margin="dense"
        size="small"
      />

      <Form.TextField
        name="name"
        fullWidth
        label="Nome"
        margin="dense"
        size="small"
      />

      <Form.TextField
        name="description"
        fullWidth
        label="Descrição"
        margin="dense"
        size="small"
      />

      <Form.TextField
        name="price"
        fullWidth
        label="Valor"
        margin="dense"
        size="small"
      />

      <Form.Switch name="isActive" label="Ativo" />
    </Box>
  );
}
