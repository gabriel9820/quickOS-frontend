import { useEffect, useState } from "react";

import { BaseAutocomplete, BaseAutocompleteProps } from "./BaseAutocomplete";
import { UserOutputModel } from "../../models/user.model";
import { fillUserAutoCompleteAsync } from "../../services/user.service";
import { useAppDispatch } from "../../store/hooks";
import { handleError } from "../../utils/error-handler";

export function UserAutocomplete(
  props: BaseAutocompleteProps<UserOutputModel>
) {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<UserOutputModel[]>([]);

  useEffect(() => {
    async function fill() {
      try {
        const { data } = await fillUserAutoCompleteAsync();

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
