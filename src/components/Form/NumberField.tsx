import { InputBaseProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export interface NumberFieldProps extends InputBaseProps {
  label: string;
}

export function FormDecimalField({ name = "", ...props }: NumberFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, onChange, ...field } }) => (
        <NumericFormat
          {...(props as any)}
          {...field}
          value={field.value || ""}
          decimalScale={2}
          fixedDecimalScale
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) => {
            onChange({
              target: { name: field.name, value: values.floatValue },
            });
          }}
          error={!!fieldError}
          helperText={fieldError?.message?.toString()}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

export function FormIntegerField({ name = "", ...props }: NumberFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, onChange, ...field } }) => (
        <NumericFormat
          {...(props as any)}
          {...field}
          value={field.value || ""}
          decimalScale={0}
          customInput={TextField}
          onValueChange={(values) => {
            onChange({
              target: { name: field.name, value: values.floatValue },
            });
          }}
          error={!!fieldError}
          helperText={fieldError?.message?.toString()}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}
