import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { FormTitle } from "../../../components/FormTitle";
import { MainForm } from "./MainForm";
import {
  ServiceOrdersMainFormData,
  serviceOrdersMainFormSchema,
} from "./schemas";
import {
  createServiceOrderAsync,
  getNextServiceOrderNumberAsync,
  getServiceOrderAsync,
  updateServiceOrderAsync,
} from "../../../services/service-order.service";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { Form } from "../../../components/Form";
import { addNotification } from "../../../store/notification/actions";
import { ServiceOrderInputModel } from "../../../models/service-order.model";
import { serviceOrderStatusOptions } from "../../../components/Autocomplete/ServiceOrderStatusAutocomplete";
import { ServiceOrderStatus } from "../../../enums/service-order-status.enum";

type Params = {
  externalId: string;
};

export function ServiceOrdersFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const readOnly = Boolean(location.state?.readOnly);
  const { externalId } = useParams<Params>();
  const [currentTabIndex, setCurrentTabIndex] = useState("1");
  const [loading, setLoading] = useState(false);

  const form = useForm<ServiceOrdersMainFormData>({
    resolver: zodResolver(serviceOrdersMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      status: serviceOrderStatusOptions.find(
        (o) => o.key === ServiceOrderStatus.Open
      ),
      date: dayjs(new Date()),
      totalPrice: 0,
    },
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getServiceOrderAsync(externalId);

        form.setValue("number", data.number);
        form.setValue("date", dayjs(data.date));
        form.setValue(
          "status",
          serviceOrderStatusOptions.find((o) => o.key === data.status)!
        );
        form.setValue("equipmentDescription", data.equipmentDescription);
        form.setValue("problemDescription", data.problemDescription);
        form.setValue("technicalReport", data.technicalReport);
        form.setValue("totalPrice", data.totalPrice);
        form.setValue("customer", {
          externalId: data.customer?.externalId,
          fullName: data.customer?.fullName,
        });
        form.setValue("technician", {
          externalId: data.technician?.externalId,
          fullName: data.technician?.fullName,
        });
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [form, dispatch]
  );

  const setInitialData = useCallback(async () => {
    try {
      const { data: nextNumber } = await getNextServiceOrderNumberAsync();

      form.setValue("number", nextNumber);
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

  async function handleSaveClick(formData: ServiceOrdersMainFormData) {
    try {
      const dto: ServiceOrderInputModel = {
        ...formData,
        date: formData.date.toDate(),
        customer: formData.customer?.externalId,
        technician: formData.technician?.externalId,
        status: formData.status?.key,
      };

      setLoading(true);
      externalId
        ? await updateServiceOrderAsync(externalId, dto)
        : await createServiceOrderAsync(dto);
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
      <FormTitle>Ordem de Serviço</FormTitle>

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
