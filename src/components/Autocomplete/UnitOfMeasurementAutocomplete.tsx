import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { UnitOfMeasurementOutputModel } from "../../models/unit-of-measurement.model";
import { fillUnitOfMeasurementAutoCompleteAsync } from "../../services/unit-of-measurement.service";

export function UnitOfMeasurementAutocomplete(
  props: BaseAutocompleteProps<UnitOfMeasurementOutputModel>
) {
  const [options, setOptions] = useState<UnitOfMeasurementOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      const { data } = await fillUnitOfMeasurementAutoCompleteAsync();

      setOptions(data);
    }

    fill();
  }, []);

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
