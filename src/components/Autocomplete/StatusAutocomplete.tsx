import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";

interface StatusOption {
  key: boolean;
  label: string;
}

const options: readonly StatusOption[] = [
  { key: true, label: "Ativo" },
  { key: false, label: "Inativo" },
];

export function StatusAutocomplete(props: BaseAutocompleteProps<StatusOption>) {
  return <BaseAutocomplete {...props} options={options} />;
}
