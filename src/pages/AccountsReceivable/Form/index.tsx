import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import dayjs from "dayjs";

import {
  AccountsReceivableMainFormData,
  accountsReceivableMainFormSchema,
} from "./schemas";
import { useAppDispatch } from "../../../store/hooks";
import { FormTitle } from "../../../components/FormTitle";
import { Form } from "../../../components/Form";
import { MainForm } from "./MainForm";
import {
  createAccountReceivableAsync,
  getAccountReceivableAsync,
  updateAccountReceivableAsync,
} from "../../../services/account-receivable.service";
import { addNotification } from "../../../store/notification/actions";
import { handleError } from "../../../utils/error-handler";
import { AccountReceivableInputModel } from "../../../models/account-receivable.model";

type Params = {
  externalId: string;
};

export function AccountsReceivableFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isPaidOut, setIsPaidOut] = useState(false);

  const form = useForm<AccountsReceivableMainFormData>({
    resolver: zodResolver(accountsReceivableMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      issueDate: dayjs(new Date().toLocaleDateString()),
      isPaidOut: false,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getAccountReceivableAsync(externalId);

        form.setValue("issueDate", dayjs(data.issueDate));
        form.setValue("dueDate", dayjs(data.dueDate));
        form.setValue(
          "paymentDate",
          data.paymentDate ? dayjs(data.paymentDate) : undefined
        );
        form.setValue("documentNumber", data.documentNumber);
        form.setValue(
          "customer",
          data.customer
            ? {
                externalId: data.customer.externalId,
                fullName: data.customer.fullName,
              }
            : undefined
        );
        form.setValue("description", data.description);
        form.setValue("value", data.value);
        form.setValue("isPaidOut", data.isPaidOut);

        setIsPaidOut(data.isPaidOut);
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [form, dispatch]
  );

  useEffect(() => {
    if (externalId) {
      setFormData(externalId);
    }
  }, [externalId, setFormData]);

  function handleTabChange(_: SyntheticEvent, newIndex: string) {
    setCurrentTabIndex(newIndex);
  }

  async function handleSaveClick(formData: AccountsReceivableMainFormData) {
    try {
      const dto: AccountReceivableInputModel = {
        ...formData,
        issueDate: formData.issueDate.format("YYYY-MM-DD"),
        dueDate: formData.dueDate.format("YYYY-MM-DD"),
        paymentDate: formData.paymentDate?.format("YYYY-MM-DD"),
        customer: formData.customer?.externalId,
      };

      setLoading(true);
      externalId
        ? await updateAccountReceivableAsync(externalId, dto)
        : await createAccountReceivableAsync(dto);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "Registro salvo",
        })
      );
      navigate(-1);
    } catch (error) {
      setLoading(false);
      handleError(error, dispatch);
    }
  }

  return (
    <Box>
      <FormTitle>Conta a Receber</FormTitle>

      <Form form={form} onSubmit={handleSaveClick}>
        <Form.TabContext value={currentTabIndex}>
          <Form.TabList onChange={handleTabChange}>
            <Form.Tab label="Principal" value="1" />
          </Form.TabList>

          <Form.TabPanel value="1">
            <MainForm isPaidOut={isPaidOut} setIsPaidOut={setIsPaidOut} />
          </Form.TabPanel>

          <Form.TabActions readOnly={readOnly} loading={loading} />
        </Form.TabContext>
      </Form>
    </Box>
  );
}
