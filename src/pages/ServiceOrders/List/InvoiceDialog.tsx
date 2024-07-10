import { useEffect, useState } from "react";
import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

import { InvoiceFormData, invoiceFormSchema } from "./schemas";
import { Form } from "../../../components/Form";
import { PaymentTypeAutocomplete } from "../../../components/Autocomplete/PaymentTypeAutocomplete";
import { PaymentType } from "../../../enums/payment-type.enum";
import { handleError } from "../../../utils/error-handler";
import { useAppDispatch } from "../../../store/hooks";
import { ServiceOrderInvoiceInputModel } from "../../../models/service-order.model";
import { invoiceServiceOrderAsync } from "../../../services/service-order.service";
import { addNotification } from "../../../store/notification/actions";
import { getAllServiceOrders } from "../../../store/service-orders/actions";

interface Props {
  open: boolean;
  serviceOrderExternalId: string;
  onClose: (option: boolean) => void;
}

export function InvoiceDialog({
  serviceOrderExternalId,
  onClose,
  ...props
}: Props) {
  const dispatch = useAppDispatch();
  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
  });
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  const paymentTypeForm = form.watch("paymentType");

  useEffect(() => {
    setPaymentType(paymentTypeForm?.key);
  }, [paymentTypeForm]);

  function handleCancel() {
    onClose(false);
    form.reset();
  }

  async function handleOk(formData: InvoiceFormData) {
    try {
      setLoading(true);

      const dto: ServiceOrderInvoiceInputModel = {
        paymentType: formData.paymentType.key,
        now: dayjs().startOf("day").format("YYYY-MM-DD"),
        dueDate: formData.dueDate?.format("YYYY-MM-DD"),
      };

      await invoiceServiceOrderAsync(serviceOrderExternalId, dto);

      dispatch(
        addNotification({
          type: "success",
          message: "Ordem de Serviço faturada",
        })
      );
      dispatch(getAllServiceOrders());
      onClose(true);
      form.reset();
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog {...props} fullWidth>
      <DialogTitle>Faturar Ordem de Serviço</DialogTitle>

      <DialogContent dividers>
        <Form form={form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PaymentTypeAutocomplete
                name="paymentType"
                fullWidth
                label="Tipo de Pagamento"
                size="small"
              />
            </Grid>

            {paymentType === PaymentType.InstallmentPayment && (
              <Grid item xs={12}>
                <Form.DateTimePicker
                  name="dueDate"
                  fullWidth
                  label="Data de Vencimento"
                  views={["day", "month", "year"]}
                  size="small"
                  disablePast
                />
              </Grid>
            )}
          </Grid>
        </Form>
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          color="inherit"
          onClick={handleCancel}
        >
          Cancelar
        </Button>

        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          onClick={form.handleSubmit(handleOk)}
          startIcon={<Check />}
        >
          Confirmar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
