import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

import { UField, UFieldProps } from "./UField";
import { CField, CFieldProps } from "./CField";

interface Props<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
}

function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit && form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.defaultProps = {
  onSubmit: undefined,
};

Form.UField = (props: UFieldProps) => UField(props);
Form.CField = (props: CFieldProps) => CField(props);

export { Form };
