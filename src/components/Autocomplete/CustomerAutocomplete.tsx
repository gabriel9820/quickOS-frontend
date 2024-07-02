import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { CustomerOutputModel } from "../../models/customer.model";
import { fillCustomerAutoCompleteAsync } from "../../services/customer.service";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";

export function CustomerAutocomplete(
  props: BaseAutocompleteProps<CustomerOutputModel>
) {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<CustomerOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      try {
        const { data } = await fillCustomerAutoCompleteAsync();

        setOptions(data);
      } catch (error) {
        handleError(error, dispatch);
      }
    }

    fill();
  }, [dispatch]);

  return (
    <BaseAutocomplete
      {...props}
      options={options}
      isOptionEqualToValue={(option, value) =>
        option.externalId === value.externalId
      }
      getOptionKey={(option: any) => option.externalId}
      getOptionLabel={(option: any) => option.fullName}
    />
  );
}
