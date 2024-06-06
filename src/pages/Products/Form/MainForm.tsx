import { Grid, TextareaAutosize } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

import { Form } from "../../../components/Form";
import { UnitOfMeasurementAutocomplete } from "../../../components/Autocomplete/UnitOfMeasurementAutocomplete";
import { ProductsMainFormData } from "./schemas";

interface Props {
  form: UseFormReturn<ProductsMainFormData>;
}

export function MainForm({ form }: Props) {
  function calculateSellingPrice() {
    const [costPrice, profitMargin] = form.getValues([
      "costPrice",
      "profitMargin",
    ]);

    if (costPrice && costPrice > 0 && profitMargin && profitMargin > 0) {
      const sellingPrice = costPrice + costPrice * (profitMargin / 100);
      form.setValue("sellingPrice", sellingPrice);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.IntegerField name="code" fullWidth label="Código" size="small" />
      </Grid>

      <Grid xl={6} sx={{ xs: { display: "none" } }}></Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="name"
          fullWidth
          label="Nome"
          size="small"
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="costPrice"
          fullWidth
          label="Preço de Custo"
          size="small"
          onChange={calculateSellingPrice}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="profitMargin"
          fullWidth
          label="Margem de Lucro (%)"
          size="small"
          onChange={calculateSellingPrice}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="sellingPrice"
          fullWidth
          label="Preço de Venda"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField
          name="stock"
          fullWidth
          label="Estoque"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <UnitOfMeasurementAutocomplete
          name="unitOfMeasurement"
          fullWidth
          label="Unidade"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="description"
          fullWidth
          label="Descrição"
          size="small"
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch name="isActive" label="Ativo" />
      </Grid>
    </Grid>
  );
}
