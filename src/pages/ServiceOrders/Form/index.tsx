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
  ServiceOrdersProductFormData,
  ServiceOrdersServiceFormData,
  serviceOrdersMainFormSchema,
  serviceOrdersProductFormSchema,
  serviceOrdersServiceFormSchema,
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
import {
  ServiceOrderInputModel,
  ServiceOrderProductInputModel,
  ServiceOrderProductOutputModel,
  ServiceOrderServiceInputModel,
  ServiceOrderServiceOutputModel,
} from "../../../models/service-order.model";
import { serviceOrderStatusOptions } from "../../../components/Autocomplete/ServiceOrderStatusAutocomplete";
import { ServiceOrderStatus } from "../../../enums/service-order-status.enum";
import { ServiceForm } from "./ServiceForm";
import { ProductForm } from "./ProductForm";

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
  const [services, setServices] = useState<ServiceOrderServiceOutputModel[]>(
    []
  );
  const [products, setProducts] = useState<ServiceOrderProductOutputModel[]>(
    []
  );

  const formPrincipal = useForm<ServiceOrdersMainFormData>({
    resolver: zodResolver(serviceOrdersMainFormSchema),
    disabled: readOnly,
    defaultValues: {
      status: serviceOrderStatusOptions.find(
        (o) => o.key === ServiceOrderStatus.Open
      ),
      date: dayjs(),
      totalPrice: 0,
    },
  });

  const formService = useForm<ServiceOrdersServiceFormData>({
    resolver: zodResolver(serviceOrdersServiceFormSchema),
    disabled: readOnly,
  });

  const formProduct = useForm<ServiceOrdersProductFormData>({
    resolver: zodResolver(serviceOrdersProductFormSchema),
    disabled: readOnly,
  });

  const setFormData = useCallback(
    async (externalId: string) => {
      try {
        const { data } = await getServiceOrderAsync(externalId);

        formPrincipal.setValue("number", data.number);
        formPrincipal.setValue("date", dayjs(data.date));
        formPrincipal.setValue(
          "status",
          serviceOrderStatusOptions.find((o) => o.key === data.status)!
        );
        formPrincipal.setValue(
          "equipmentDescription",
          data.equipmentDescription
        );
        formPrincipal.setValue("problemDescription", data.problemDescription);
        formPrincipal.setValue("technicalReport", data.technicalReport);
        formPrincipal.setValue("totalPrice", data.totalPrice);
        formPrincipal.setValue("customer", {
          externalId: data.customer?.externalId,
          fullName: data.customer?.fullName,
        });
        formPrincipal.setValue("technician", {
          externalId: data.technician?.externalId,
          fullName: data.technician?.fullName,
        });

        if (data.services) {
          setServices(data.services);
        }

        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        handleError(error, dispatch);
      }
    },
    [formPrincipal, dispatch]
  );

  const setInitialData = useCallback(async () => {
    try {
      const { data: nextNumber } = await getNextServiceOrderNumberAsync();

      formPrincipal.setValue("number", nextNumber);
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [formPrincipal, dispatch]);

  useEffect(() => {
    if (externalId) {
      setFormData(externalId);
    } else {
      setInitialData();
    }
  }, [externalId, setFormData, setInitialData]);

  useEffect(() => {
    const totalServices = services
      .map((s) => s.totalPrice)
      .reduce((prev, curr) => prev + curr, 0);
    const totalProducts = products
      .map((p) => p.totalPrice)
      .reduce((prev, curr) => prev + curr, 0);

    formPrincipal.setValue("totalPrice", totalServices + totalProducts);
  }, [services, products, formPrincipal]);

  function handleTabChange(_: SyntheticEvent, newIndex: string) {
    setCurrentTabIndex(newIndex);
  }

  async function handleSaveClick() {
    try {
      const isFormPrincipalValid = await formPrincipal.trigger();

      if (!isFormPrincipalValid) {
        setCurrentTabIndex("1");
        return;
      }

      const formPrincipalData = formPrincipal.getValues();
      const servicesInputModel = services.map<ServiceOrderServiceInputModel>(
        (s) => ({
          ...s,
          service: s.service.externalId!,
        })
      );
      const productsInputModel = products.map<ServiceOrderProductInputModel>(
        (s) => ({
          ...s,
          product: s.product.externalId!,
        })
      );

      const dto: ServiceOrderInputModel = {
        ...formPrincipalData,
        date: formPrincipalData.date.toDate(),
        customer: formPrincipalData.customer?.externalId,
        technician: formPrincipalData.technician?.externalId,
        status: formPrincipalData.status?.key,
        services: servicesInputModel,
        products: productsInputModel,
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

      <Form.TabContext value={currentTabIndex}>
        <Form.TabList onChange={handleTabChange}>
          <Form.Tab label="Principal" value="1" />
          <Form.Tab label="Serviços" value="2" />
          <Form.Tab label="Produtos" value="3" />
        </Form.TabList>

        <Form.TabPanel value="1">
          <Form form={formPrincipal}>
            <MainForm creating={!externalId} />
          </Form>
        </Form.TabPanel>

        <Form.TabPanel value="2">
          <Form form={formService}>
            <ServiceForm services={services} setServices={setServices} />
          </Form>
        </Form.TabPanel>

        <Form.TabPanel value="3">
          <Form form={formProduct}>
            <ProductForm products={products} setProducts={setProducts} />
          </Form>
        </Form.TabPanel>

        <Form.TabActions
          readOnly={readOnly}
          loading={loading}
          onSubmitClick={handleSaveClick}
        />
      </Form.TabContext>
    </Box>
  );
}
