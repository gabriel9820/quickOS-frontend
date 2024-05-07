import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface FormSwitchProps extends SwitchProps {
  label: string;
}

export function FormSwitch({ name = "", label, ...props }: FormSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...props} {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
}
