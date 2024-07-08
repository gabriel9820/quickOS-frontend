import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

import { Form } from "../../../components/Form";
import { AccountsPayableMainFormData } from "./schemas";

interface Props {
  isPaidOut: boolean;
  setIsPaidOut: Dispatch<SetStateAction<boolean>>;
}

export function MainForm({ isPaidOut, setIsPaidOut }: Props) {
  const { setValue, resetField } =
    useFormContext<AccountsPayableMainFormData>();

  function handleIsPaidOutChange(
    _: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    setIsPaidOut(checked);

    if (checked) {
      setValue("paymentDate", dayjs().startOf("day"));
    } else {
      resetField("paymentDate");
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="issueDate"
          fullWidth
          label="Data de Emissão"
          views={["day", "month", "year"]}
          size="small"
          autoFocus
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DateTimePicker
          name="dueDate"
          fullWidth
          label="Data de Vencimento"
          views={["day", "month", "year"]}
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="documentNumber"
          fullWidth
          label="Nº Documento"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.TextField
          name="description"
          fullWidth
          label="Descrição"
          size="small"
        />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.DecimalField name="value" fullWidth label="Valor" size="small" />
      </Grid>

      <Grid item xs={12} xl={6}>
        <Form.Switch
          name="isPaidOut"
          label="Pago"
          onChange={handleIsPaidOutChange}
        />
      </Grid>

      {isPaidOut && (
        <Grid item xs={12} xl={6}>
          <Form.DateTimePicker
            name="paymentDate"
            fullWidth
            label="Data de Pagamento"
            views={["day", "month", "year"]}
            size="small"
          />
        </Grid>
      )}
    </Grid>
  );
}
