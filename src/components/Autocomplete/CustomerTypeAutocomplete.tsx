import { CustomerType } from "../../enums/customer-type.enum";
import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface CustomerTypeOption {
  key: CustomerType;
  label: string;
}

const customerTypeOptions: readonly CustomerTypeOption[] = [
  { key: CustomerType.Individual, label: "Física" },
  { key: CustomerType.Company, label: "Jurídica" },
];

function CustomerTypeAutocomplete(
  props: BaseAutocompleteProps<CustomerTypeOption>
) {
  return (
    <BaseAutocomplete
      {...props}
      options={customerTypeOptions}
      isOptionEqualToValue={(option, value) => option.key === value.key}
    />
  );
}

export { CustomerTypeAutocomplete, customerTypeOptions };
