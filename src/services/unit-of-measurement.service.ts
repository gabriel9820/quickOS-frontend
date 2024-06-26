import { api } from "./api";
import { UnitOfMeasurementOutputModel } from "../models/unit-of-measurement.model";

export async function fillUnitOfMeasurementAutoCompleteAsync() {
  return api.get<UnitOfMeasurementOutputModel[]>(
    "/unit-of-measurement/fill-autocomplete"
  );
}
