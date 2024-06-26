import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function FormTextField({ name = "", ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors, disabled },
  } = useFormContext();
  const fieldError = errors[name];
  const disabledInput = disabled || props.disabled;

  return (
    <TextField
      {...props}
      {...register(name)}
      error={!!fieldError}
      helperText={fieldError?.message?.toString()}
      InputLabelProps={{ ...props.InputLabelProps, shrink: true }}
      InputProps={{
        ...props.InputProps,
        readOnly: disabledInput,
        disabled: disabledInput,
      }}
    />
  );
}
