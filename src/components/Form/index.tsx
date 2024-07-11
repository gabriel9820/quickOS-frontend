import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import {
  TabContext,
  TabContextProps,
  TabListProps,
  TabPanelProps,
} from "@mui/lab";
import { TabProps, TextFieldProps } from "@mui/material";

import {
  FormTab,
  FormTabActions,
  FormTabActionsProps,
  FormTabList,
  FormTabPanel,
} from "./Tabs";
import { FormTextField } from "./TextField";
import { FormSwitch, FormSwitchProps } from "./Switch";
import {
  FormDecimalField,
  FormIntegerField,
  NumberFieldProps,
} from "./NumberField";
import { DateTimeFieldProps, FormDateTimeField } from "./DateTimeField";

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

Form.TabContext = (props: TabContextProps) => TabContext(props);
Form.TabList = (props: TabListProps) => FormTabList(props);
Form.Tab = (props: TabProps) => FormTab(props);
Form.TabPanel = (props: TabPanelProps) => FormTabPanel(props);
Form.TabActions = (props: FormTabActionsProps) => FormTabActions(props);

Form.TextField = (props: TextFieldProps) => FormTextField(props);
Form.Switch = (props: FormSwitchProps) => FormSwitch(props);
Form.DecimalField = (props: NumberFieldProps) => FormDecimalField(props);
Form.IntegerField = (props: NumberFieldProps) => FormIntegerField(props);
Form.DateTimePicker = (props: DateTimeFieldProps) => FormDateTimeField(props);

export { Form };
