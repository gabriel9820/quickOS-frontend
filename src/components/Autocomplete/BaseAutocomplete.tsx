import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Props<T>
  extends Omit<
    AutocompleteProps<
      T,
      boolean | undefined,
      boolean | undefined,
      boolean | undefined
    >,
    "renderInput"
  > {
  name: string;
  label: string;
}

export interface BaseAutocompleteProps<T> extends Omit<Props<T>, "options"> {}

export function BaseAutocomplete<T>({ name, label, ...props }: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, disabled } }) => (
        <Autocomplete
          {...props}
          onChange={(_, data) => onChange(data)}
          disabled={disabled}
          filterSelectedOptions
          noOptionsText="Sem dados"
          loadingText="Carregando..."
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {props.loading && (
                      <CircularProgress color="inherit" size={18} />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              error={!!fieldError}
              helperText={
                Array.isArray(fieldError)
                  ? fieldError
                      .map((error) => error.keys.message?.toString())
                      .join(", ")
                  : fieldError?.message?.toString()
              }
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      )}
    />
  );
}
