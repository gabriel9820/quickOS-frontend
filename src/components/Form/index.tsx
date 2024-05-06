import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import {
  TabContext,
  TabContextProps,
  TabListProps,
  TabPanelProps,
} from "@mui/lab";
import { TabProps } from "@mui/material";

import { UField, UFieldProps } from "./UField";
import { CField, CFieldProps } from "./CField";
import {
  FormTab,
  FormTabActions,
  FormTabActionsProps,
  FormTabList,
  FormTabPanel,
} from "./Tabs";

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

Form.TabContext = (props: TabContextProps) => TabContext(props);
Form.TabList = (props: TabListProps) => FormTabList(props);
Form.Tab = (props: TabProps) => FormTab(props);
Form.TabPanel = (props: TabPanelProps) => FormTabPanel(props);
Form.TabActions = (props: FormTabActionsProps) => FormTabActions(props);

export { Form };
