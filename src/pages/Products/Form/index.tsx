import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormTitle } from "../../../components/FormTitle";
import { MainForm } from "./MainForm";
import { ProductsMainFormData, productsMainFormSchema } from "./schemas";
import {
  createProductAsync,
  getNextProductCodeAsync,
  getProductAsync,
  updateProductAsync,
} from "../../../services/product.service";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { Form } from "../../../components/Form";
import { addNotification } from "../../../store/notification/actions";
import { ProductInputModel } from "../../../models/product.model";

type Params = {
  externalId: string;
};

export function ProductsFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<ProductsMainFormData>({
    resolver: zodResolver(productsMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      isActive: true,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getProductAsync(externalId);

        form.setValue("code", data.code);
        form.setValue("name", data.name);
        form.setValue("description", data.description);
        form.setValue("costPrice", data.costPrice);
        form.setValue("profitMargin", data.profitMargin);
        form.setValue("sellingPrice", data.sellingPrice);
        form.setValue("stock", data.stock);
        form.setValue("unitOfMeasurement", {
          externalId: data.unitOfMeasurement?.externalId,
          name: data.unitOfMeasurement?.name,
        });
        form.setValue("isActive", data.isActive);
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [form, dispatch]
  );

  const setInitialData = useCallback(async () => {
    try {
      const { data: nextCode } = await getNextProductCodeAsync();

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

  async function handleSaveClick(formData: ProductsMainFormData) {
    try {
      const dto: ProductInputModel = {
        ...formData,
        unitOfMeasurement: formData.unitOfMeasurement?.externalId,
      };

      setLoading(true);
      externalId
        ? await updateProductAsync(externalId, dto)
        : await createProductAsync(dto);
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
      <FormTitle>Cadastro de Produto</FormTitle>

      <Form form={form} onSubmit={handleSaveClick}>
        <Form.TabContext value={currentTabIndex}>
          <Form.TabList onChange={handleTabChange}>
            <Form.Tab label="Principal" value="1" />
          </Form.TabList>

          <Form.TabPanel value="1">
            <MainForm form={form} />
          </Form.TabPanel>

          <Form.TabActions readOnly={readOnly} loading={loading} />
        </Form.TabContext>
      </Form>
    </Box>
  );
}
