import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import dayjs from "dayjs";

import {
  AccountsPayableMainFormData,
  accountsPayableMainFormSchema,
} from "./schemas";
import { useAppDispatch } from "../../../store/hooks";
import { FormTitle } from "../../../components/FormTitle";
import { Form } from "../../../components/Form";
import { MainForm } from "./MainForm";
import {
  createAccountPayableAsync,
  getAccountPayableAsync,
  updateAccountPayableAsync,
} from "../../../services/account-payable.service";
import { addNotification } from "../../../store/notification/actions";
import { handleError } from "../../../utils/error-handler";
import { AccountPayableInputModel } from "../../../models/account-payable.model";

type Params = {
  externalId: string;
};

export function AccountsPayableFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);
  const [isPaidOut, setIsPaidOut] = useState(false);

  const form = useForm<AccountsPayableMainFormData>({
    resolver: zodResolver(accountsPayableMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      issueDate: dayjs(new Date()),
      isPaidOut: false,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getAccountPayableAsync(externalId);

        form.setValue("issueDate", dayjs(data.issueDate));
        form.setValue("dueDate", dayjs(data.dueDate));
        form.setValue(
          "paymentDate",
          data.paymentDate ? dayjs(data.paymentDate) : undefined
        );
        form.setValue("documentNumber", data.documentNumber);
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

  async function handleSaveClick(formData: AccountsPayableMainFormData) {
    try {
      const dto: AccountPayableInputModel = {
        ...formData,
        issueDate: formData.issueDate.toISOString().split("T")[0],
        dueDate: formData.dueDate.toISOString().split("T")[0],
        paymentDate: formData.paymentDate?.toISOString().split("T")[0],
      };

      setLoading(true);
      externalId
        ? await updateAccountPayableAsync(externalId, dto)
        : await createAccountPayableAsync(dto);
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
      <FormTitle>Conta a Pagar</FormTitle>

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
