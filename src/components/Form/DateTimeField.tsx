import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

export interface DateTimeFieldProps extends DateTimePickerProps<never, any> {
  label?: string;
  fullWidth?: boolean;
  disabledInput?: boolean;
  size: "small" | "medium";
}

export function FormDateTimeField({
  name = "",
  fullWidth,
  size,
  disabledInput = false,
  ...props
}: DateTimeFieldProps) {
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
      render={({ field: { ref, ...field } }) => (
        <DateTimePicker
          {...(props as any)}
          {...field}
          value={field.value || null}
          slotProps={{
            textField: {
              InputLabelProps: { shrink: true },
              fullWidth: fullWidth,
              size: size,
              disabled: disabledInput,
              error: !!fieldError,
              helperText: fieldError?.message?.toString(),
            },
          }}
        />
      )}
    />
  );
}
