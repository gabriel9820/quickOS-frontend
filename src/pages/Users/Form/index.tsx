import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";

import { UsersMainFormData, usersMainFormSchema } from "./schemas";
import { useAppDispatch } from "../../../store/hooks";
import { FormTitle } from "../../../components/FormTitle";
import { Form } from "../../../components/Form";
import { MainForm } from "./MainForm";
import {
  createUserAsync,
  getUserAsync,
  updateUserAsync,
} from "../../../services/user.service";
import { addNotification } from "../../../store/notification/actions";
import { handleError } from "../../../utils/error-handler";
import { UserInputModel } from "../../../models/user.model";
import { userRoleOptions } from "../../../components/Autocomplete/UserRoleAutocomplete";

type Params = {
  externalId: string;
};

export function UsersFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<UsersMainFormData>({
    resolver: zodResolver(usersMainFormSchema(!externalId)),
    disabled: readOnly,
    defaultValues: {
      isActive: true,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getUserAsync(externalId);

        form.setValue("fullName", data.fullName);
        form.setValue("cellphone", data.cellphone);
        form.setValue("email", data.email);
        form.setValue(
          "role",
          userRoleOptions.find((o) => o.key === data.role)!
        );
        form.setValue("isActive", data.isActive);
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

  async function handleSaveClick(formData: UsersMainFormData) {
    try {
      const dto: UserInputModel = {
        ...formData,
        role: formData.role.key,
      };

      setLoading(true);
      externalId
        ? await updateUserAsync(externalId, dto)
        : await createUserAsync(dto);
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
      <FormTitle>Cadastro de Usuário</FormTitle>

      <Form form={form} onSubmit={handleSaveClick}>
        <Form.TabContext value={currentTabIndex}>
          <Form.TabList onChange={handleTabChange}>
            <Form.Tab label="Principal" value="1" />
          </Form.TabList>

          <Form.TabPanel value="1">
            <MainForm creating={!externalId} />
          </Form.TabPanel>

          <Form.TabActions readOnly={readOnly} loading={loading} />
        </Form.TabContext>
      </Form>
    </Box>
  );
}
