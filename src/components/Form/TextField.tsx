import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export function FormTextField({ name = "", ...props }: TextFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <TextField
      {...props}
      {...register(name)}
      error={!!fieldError}
      helperText={fieldError?.message?.toString()}
      InputLabelProps={{ shrink: true }}
    />
  );
}
