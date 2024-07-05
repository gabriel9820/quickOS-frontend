import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface BooleanOption {
  key: boolean;
  label: string;
}

const options: readonly BooleanOption[] = [
  { key: true, label: "Sim" },
  { key: false, label: "Não" },
];

export function BooleanAutocomplete(
  props: BaseAutocompleteProps<BooleanOption>
) {
  return (
    <BaseAutocomplete
      {...props}
      options={options}
      isOptionEqualToValue={(option, value) => option.key === value.key}
    />
  );
}
