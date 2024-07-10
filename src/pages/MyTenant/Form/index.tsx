import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormTitle } from "../../../components/FormTitle";
import { MainForm } from "./MainForm";
import { MyTenantMainFormData, myTenantMainFormSchema } from "./schemas";
import {
  getCurrentTenantAsync,
  updateCurrentTenantAsync,
} from "../../../services/tenant.service";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { Form } from "../../../components/Form";
import { addNotification } from "../../../store/notification/actions";
import { updateTenant } from "../../../store/auth/actions";

export function MyTenantFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<MyTenantMainFormData>({
    resolver: zodResolver(myTenantMainFormSchema),
  });

  const setFormData = useCallback(async () => {
    try {
      const { data } = await getCurrentTenantAsync();

      form.setValue("name", data.name);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [form, dispatch]);

  useEffect(() => {
    setFormData();
  }, [setFormData]);

  function handleTabChange(_: SyntheticEvent, newIndex: string) {
    setCurrentTabIndex(newIndex);
  }

  async function handleSaveClick(formData: MyTenantMainFormData) {
    try {
      setLoading(true);
      const { data } = await updateCurrentTenantAsync(formData);
      setLoading(false);

      dispatch(updateTenant(data));
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
      <FormTitle>Meu Estabelecimento</FormTitle>

      <Form form={form} onSubmit={handleSaveClick}>
        <Form.TabContext value={currentTabIndex}>
          <Form.TabList onChange={handleTabChange}>
            <Form.Tab label="Principal" value="1" />
          </Form.TabList>

          <Form.TabPanel value="1">
            <MainForm />
          </Form.TabPanel>

          <Form.TabActions readOnly={false} loading={loading} />
        </Form.TabContext>
      </Form>
    </Box>
  );
}
