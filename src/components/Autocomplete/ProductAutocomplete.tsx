import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { ProductOutputModel } from "../../models/product.model";
import { fillProductAutoCompleteAsync } from "../../services/product.service";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";

export function ProductAutocomplete(
  props: BaseAutocompleteProps<ProductOutputModel>
) {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<ProductOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      try {
        const { data } = await fillProductAutoCompleteAsync();

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
      getOptionLabel={(option: any) => option.name}
    />
  );
}
