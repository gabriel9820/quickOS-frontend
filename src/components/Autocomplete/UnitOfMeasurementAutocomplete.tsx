import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { UnitOfMeasurementOutputModel } from "../../models/unit-of-measurement.model";
import { fillUnitOfMeasurementAutoCompleteAsync } from "../../services/unit-of-measurement.service";
import { useAppDispatch } from "../../store/hooks";
import { handleError } from "../../utils/error-handler";

export function UnitOfMeasurementAutocomplete(
  props: BaseAutocompleteProps<UnitOfMeasurementOutputModel>
) {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<UnitOfMeasurementOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      try {
        const { data } = await fillUnitOfMeasurementAutoCompleteAsync();

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
