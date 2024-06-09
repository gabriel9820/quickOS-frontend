import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";

import { CustomersMainFormData, customersMainFormSchema } from "./schemas";
import { useAppDispatch } from "../../../store/hooks";
import { FormTitle } from "../../../components/FormTitle";
import { Form } from "../../../components/Form";
import { MainForm } from "./MainForm";
import {
  createCustomerAsync,
  getCustomerAsync,
  getNextCustomerCodeAsync,
  updateCustomerAsync,
} from "../../../services/customer.service";
import { addNotification } from "../../../store/notification/actions";
import { handleError } from "../../../utils/error-handler";
import { CustomerInputModel } from "../../../models/customer.model";
import { customerTypeOptions } from "../../../components/Autocomplete/CustomerTypeAutocomplete";

type Params = {
  externalId: string;
};

export function CustomersFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<CustomersMainFormData>({
    resolver: zodResolver(customersMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      isActive: true,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getCustomerAsync(externalId);

        form.setValue("code", data.code);
        form.setValue(
          "type",
          customerTypeOptions.find((o) => o.key === data.type)!
        );
        form.setValue("document", data.document);
        form.setValue("fullName", data.fullName);
        form.setValue("cellphone", data.cellphone);
        form.setValue("email", data.email);
        form.setValue("isActive", data.isActive);
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [form, dispatch]
  );

  const setInitialData = useCallback(async () => {
    try {
      const { data: nextCode } = await getNextCustomerCodeAsync();

      form.setValue("code", nextCode);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [form, dispatch]);

  useEffect(() => {
    if (externalId) {
      setFormData(externalId);
    } else {
      setInitialData();
    }
  }, [externalId, setFormData, setInitialData]);

  function handleTabChange(_: SyntheticEvent, newIndex: string) {
    setCurrentTabIndex(newIndex);
  }

  async function handleSaveClick(formData: CustomersMainFormData) {
    try {
      const dto: CustomerInputModel = {
        ...formData,
        type: formData.type.key,
      };

      setLoading(true);
      externalId
        ? await updateCustomerAsync(externalId, dto)
        : await createCustomerAsync(dto);
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
      <FormTitle>Cadastro de Cliente</FormTitle>

      <Form form={form} onSubmit={handleSaveClick}>
        <Form.TabContext value={currentTabIndex}>
          <Form.TabList onChange={handleTabChange}>
            <Form.Tab label="Principal" value="1" />
          </Form.TabList>

          <Form.TabPanel value="1">
            <MainForm />
          </Form.TabPanel>

          <Form.TabActions readOnly={readOnly} loading={loading} />
        </Form.TabContext>
      </Form>
    </Box>
  );
}
