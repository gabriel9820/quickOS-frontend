import {
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface FormSwitchProps extends SwitchProps {
  label: string;
}

export function FormSwitch({ name = "", label, ...props }: FormSwitchProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <FormControlLabel
            control={
              <Switch
                {...props}
                {...field}
                onChange={(event, checked) => {
                  field.onChange(event, checked);
                  props.onChange && props.onChange(event, checked);
                }}
                checked={field.value}
              />
            }
            label={label}
          />
          {fieldError && (
            <FormHelperText error={true} sx={{ margin: "4px 14px 0px" }}>
              {fieldError.message?.toString()}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
