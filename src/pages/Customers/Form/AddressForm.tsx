import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Form } from "../../../components/Form";
import { MaskInput } from "../../../components/Form/MaskInput";
import { cepMask, cepRegex } from "../../../utils/masks";
import { getAddressByCepAsync } from "../../../services/cep.service";
import { CustomersMainFormData } from "./schemas";
import { useAppDispatch } from "../../../store/hooks";
import { handleError } from "../../../utils/error-handler";

export function AddressForm() {
  const dispatch = useAppDispatch();
  const { getValues, setValue } = useFormContext<CustomersMainFormData>();

  async function onZipCodeBlur() {
    try {
      const zipCode = getValues("address.zipCode");

      if (zipCode && cepRegex.test(zipCode)) {
        const { data: response } = await getAddressByCepAsync(zipCode);
        setValue("address", { ...response, zipCode: zipCode });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.zipCode"
          fullWidth
          label="CEP"
          size="small"
          InputProps={{
            inputComponent: MaskInput,
            inputProps: { mask: cepMask, onBlur: onZipCodeBlur },
          }}
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.street"
          fullWidth
          label="Logradouro"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.number"
          fullWidth
          label="Nº"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.details"
          fullWidth
          label="Complemento"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.neighborhood"
          fullWidth
          label="Bairro"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.city"
          fullWidth
          label="Cidade"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="address.state"
          fullWidth
          label="Estado"
          size="small"
        />
      </Grid>
    </Grid>
  );
}
