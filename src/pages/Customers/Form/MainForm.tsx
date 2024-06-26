import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Form } from "../../../components/Form";
import { MaskInput } from "../../../components/Form/MaskInput";
import { cellphoneMask, cpfMask, cnpjMask } from "../../../utils/masks";
import { CustomerTypeAutocomplete } from "../../../components/Autocomplete/CustomerTypeAutocomplete";
import { CustomersMainFormData } from "./schemas";
import { CustomerType } from "../../../enums/customer-type.enum";

export function MainForm() {
  const { watch } = useFormContext<CustomersMainFormData>();
  const [documentMask, setDocumentMask] = useState("");

  const type = watch("type");

  useEffect(() => {
    switch (type?.key) {
      case CustomerType.Individual:
        setDocumentMask(cpfMask);
        break;
      case CustomerType.Company:
        setDocumentMask(cnpjMask);
        break;
    }
  }, [type]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField name="code" fullWidth label="Código" size="small" />
      </Grid>

      <Grid xl={6} sx={{ xs: { display: "none" } }}></Grid>

      <Grid item xs={12} xl={6}>
        <CustomerTypeAutocomplete
          name="type"
          fullWidth
          label="Tipo de Pessoa"
          size="small"
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="document"
          fullWidth
          label="Documento (CPF/CNPJ)"
          size="small"
          InputProps={{
            inputComponent: MaskInput,
            inputProps: { mask: documentMask },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField name="fullName" fullWidth label="Nome" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="cellphone"
          fullWidth
          label="Celular"
          size="small"
          InputProps={{
            inputComponent: MaskInput,
            inputProps: { mask: cellphoneMask },
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="email"
          fullWidth
          label="Email"
          type="email"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isActive" label="Ativo" />
      </Grid>
    </Grid>
  );
}
