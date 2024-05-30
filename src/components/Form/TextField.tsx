import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function FormTextField({ name = "", ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors, disabled },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <TextField
      {...props}
      {...register(name, { disabled: props.disabled || disabled })}
      error={!!fieldError}
      helperText={fieldError?.message?.toString()}
      InputLabelProps={{ shrink: true }}
    />
  );
}
