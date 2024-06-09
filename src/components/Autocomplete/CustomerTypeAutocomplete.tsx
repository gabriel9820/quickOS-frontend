import { CustomerType } from "../../enums/customer-type.enum";
import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface CustomerTypeOption {
  key: CustomerType;
  label: string;
}

const options: readonly CustomerTypeOption[] = [
  { key: CustomerType.Individual, label: "Física" },
  { key: CustomerType.Company, label: "Jurídica" },
];

export function CustomerTypeAutocomplete(props: BaseAutocompleteProps<CustomerTypeOption>) {
  return (
    <BaseAutocomplete
      {...props}
      options={options}
      isOptionEqualToValue={(option, value) => option.key === value.key}
    />
  );
}
