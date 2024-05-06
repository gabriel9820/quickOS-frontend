import { PropsWithChildren, ReactElement, cloneElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

export interface CFieldProps extends PropsWithChildren {
  name: string;
}

export function CField({ name, children }: CFieldProps) {
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
      render={({ field: { ref, ...field }, ...controlledProps }) =>
        cloneElement(children as ReactElement, {
          ...field,
          ...controlledProps,
          error: !!fieldError,
          helperText: fieldError?.message?.toString(),
        })
      }
    />
  );
}
