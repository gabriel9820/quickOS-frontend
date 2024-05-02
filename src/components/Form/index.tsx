import { PropsWithChildren, ReactElement } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  FormProvider,
  UseFormRegisterReturn,
  UseFormReturn,
  UseFormStateReturn,
  useFormContext,
} from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface CustomFormProps<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
}

function CustomForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: CustomFormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit && form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

CustomForm.defaultProps = {
  onSubmit: undefined,
};

interface CustomFieldProps {
  name: string;
  render: {
    controlled?: (props: {
      field: Omit<ControllerRenderProps, "ref"> & { error: boolean };
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<FieldValues>;
    }) => ReactElement;
    uncontrolled?: (props: {
      field: UseFormRegisterReturn & { error: boolean };
    }) => ReactElement;
  };
}

CustomForm.Field = function CustomField({ name, render }: CustomFieldProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  return (
    <>
      {render.uncontrolled ? (
        render.uncontrolled({
          field: {
            ...register(name),
            error: !!fieldError,
          },
        })
      ) : (
        <Controller
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, ...controlledProps }) =>
            render.controlled ? (
              render.controlled({
                field: { ...field, error: !!fieldError },
                ...controlledProps,
              })
            ) : (
              <></>
            )
          }
          name={name}
          control={control}
        />
      )}
      {fieldError && (
        <FormHelperText error={true}>
          {fieldError.message?.toString()}
        </FormHelperText>
      )}
    </>
  );
};

export { CustomForm };
