import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormTitle } from "../../../components/FormTitle";
import { MainForm } from "./MainForm";
import { ServicesMainFormData, servicesMainFormSchema } from "./schemas";
import {
  createServiceAsync,
  getNextServiceCodeAsync,
  getServiceAsync,
  updateServiceAsync,
} from "../../../services/service-provided.service";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { Form } from "../../../components/Form";
import { addNotification } from "../../../store/notification/actions";

type Params = {
  externalId: string;
};

export function ServicesFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<ServicesMainFormData>({
    resolver: zodResolver(servicesMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      isActive: true,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getServiceAsync(externalId);

        form.setValue("code", data.code);
        form.setValue("name", data.name);
        form.setValue("description", data.description);
        form.setValue("price", data.price);
        form.setValue("isActive", data.isActive);
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [form, dispatch]
  );

  const setInitialData = useCallback(async () => {
    try {
      const { data: nextCode } = await getNextServiceCodeAsync();

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

  async function handleSaveClick(formData: ServicesMainFormData) {
    try {
      setLoading(true);
      externalId
        ? await updateServiceAsync(externalId, formData)
        : await createServiceAsync(formData);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "Salvo com sucesso",
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
      <FormTitle>Cadastro de Serviço</FormTitle>

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
