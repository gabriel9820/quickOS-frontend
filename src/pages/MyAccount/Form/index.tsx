import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormTitle } from "../../../components/FormTitle";
import { MainForm } from "./MainForm";
import {
  MyAccountMainFormData,
  MyAccountPasswordFormData,
  myAccountMainFormSchema,
  myAccountPasswordFormSchema,
} from "./schemas";
import {
  changePasswordAsync,
  getCurrentUserAsync,
  updateCurrentUserAsync,
} from "../../../services/user.service";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { Form } from "../../../components/Form";
import { addNotification } from "../../../store/notification/actions";
import { logoutUser, updateUser } from "../../../store/auth/actions";
import { userRoleOptions } from "../../../components/Autocomplete/UserRoleAutocomplete";
import { PasswordForm } from "./PasswordForm";

export function MyAccountFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const formAccount = useForm<MyAccountMainFormData>({
    resolver: zodResolver(myAccountMainFormSchema),
  });

  const formPassword = useForm<MyAccountPasswordFormData>({
    resolver: zodResolver(myAccountPasswordFormSchema),
  });

  const setFormData = useCallback(async () => {
    try {
      const { data } = await getCurrentUserAsync();

      formAccount.setValue("fullName", data.fullName);
      formAccount.setValue("cellphone", data.cellphone);
      formAccount.setValue("email", data.email);
      formAccount.setValue(
        "role",
        userRoleOptions.find((o) => o.key === data.role)!
      );
      formAccount.setValue("isActive", data.isActive);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [formAccount, dispatch]);

  useEffect(() => {
    setFormData();
  }, [setFormData]);

  function handleTabChange(_: SyntheticEvent, newIndex: string) {
    setCurrentTabIndex(newIndex);
  }

  async function handleSaveUserClick(formData: MyAccountMainFormData) {
    try {
      setLoading(true);
      const { data } = await updateCurrentUserAsync(formData);
      setLoading(false);

      dispatch(updateUser(data));
      dispatch(
        addNotification({
          type: "success",
          message: "Registro salvo",
        })
      );
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      handleError(error, dispatch);
    }
  }

  async function handleChangePasswordClick(
    formData: MyAccountPasswordFormData
  ) {
    try {
      setLoading(true);
      await changePasswordAsync(formData);
      setLoading(false);

      dispatch(
        addNotification({
          type: "success",
          message: "Senha alterada, faça login novamente",
        })
      );
      dispatch(logoutUser());
    } catch (error) {
      setLoading(false);
      handleError(error, dispatch);
    }
  }

  return (
    <Box>
      <FormTitle>Minha Conta</FormTitle>

      <Form.TabContext value={currentTabIndex}>
        <Form.TabList onChange={handleTabChange}>
          <Form.Tab label="Principal" value="1" />
          <Form.Tab label="Senha" value="2" />
        </Form.TabList>

        <Form form={formAccount} onSubmit={handleSaveUserClick}>
          <Form.TabPanel value="1">
            <MainForm />
          </Form.TabPanel>
          {currentTabIndex === "1" && (
            <Form.TabActions readOnly={false} loading={loading} />
          )}
        </Form>

        <Form form={formPassword} onSubmit={handleChangePasswordClick}>
          <Form.TabPanel value="2">
            <PasswordForm />
          </Form.TabPanel>
          {currentTabIndex === "2" && (
            <Form.TabActions readOnly={false} loading={loading} />
          )}
        </Form>
      </Form.TabContext>
    </Box>
  );
}
