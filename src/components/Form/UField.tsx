import { PropsWithChildren, ReactElement, cloneElement } from "react";
import { useFormContext } from "react-hook-form";

export interface UFieldProps extends PropsWithChildren {
  name: string;
}

export function UField({ name, children }: UFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return cloneElement(children as ReactElement, {
    ...register(name),
    error: !!fieldError,
    helperText: fieldError?.message?.toString(),
  });
}
