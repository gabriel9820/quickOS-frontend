import { PaymentType } from "../../enums/payment-type.enum";
import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface PaymentTypeOption {
  key: PaymentType;
  label: string;
}

const paymentTypeOptions: readonly PaymentTypeOption[] = [
  { key: PaymentType.CashPayment, label: "À vista" },
  { key: PaymentType.InstallmentPayment, label: "A prazo" },
];

function PaymentTypeAutocomplete(
  props: BaseAutocompleteProps<PaymentTypeOption>
) {
  return (
    <BaseAutocomplete
      {...props}
      options={paymentTypeOptions}
      isOptionEqualToValue={(option, value) => option.key === value.key}
    />
  );
}

export { PaymentTypeAutocomplete, paymentTypeOptions };
