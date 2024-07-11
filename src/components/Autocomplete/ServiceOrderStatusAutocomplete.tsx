import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { ServiceOrderStatus } from "../../enums/service-order-status.enum";

interface StatusOption {
  key: ServiceOrderStatus;
  label: string;
  disabled?: boolean;
}

const serviceOrderStatusOptions: readonly StatusOption[] = [
  { key: ServiceOrderStatus.Open, label: "Aberto" },
  { key: ServiceOrderStatus.InProgress, label: "Em Andamento" },
  { key: ServiceOrderStatus.Quotation, label: "Orçamento" },
  { key: ServiceOrderStatus.Approved, label: "Orçamento Aprovado" },
  { key: ServiceOrderStatus.Rejected, label: "Orçamento Rejeitado" },
  { key: ServiceOrderStatus.Completed, label: "Finalizado" },
  { key: ServiceOrderStatus.Invoiced, label: "Faturado", disabled: true },
];

function ServiceOrderStatusAutocomplete(
  props: BaseAutocompleteProps<StatusOption>
) {
  return (
    <BaseAutocomplete
      {...props}
      options={serviceOrderStatusOptions}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      getOptionDisabled={(option) => !!option.disabled}
    />
  );
}

export { ServiceOrderStatusAutocomplete, serviceOrderStatusOptions };
