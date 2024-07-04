import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { ServiceOutputModel } from "../../models/service.model";
import { fillServiceAutoCompleteAsync } from "../../services/service-provided.service";
import { handleError } from "../../utils/error-handler";
import { useAppDispatch } from "../../store/hooks";

export function ServiceAutocomplete(
  props: BaseAutocompleteProps<ServiceOutputModel>
) {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<ServiceOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      try {
        const { data } = await fillServiceAutoCompleteAsync();

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
