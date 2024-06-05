interface UnitOfMeasurement {
  name: string;
  abbreviation: string;
}

export interface UnitOfMeasurementOutputModel extends UnitOfMeasurement {
  externalId: string;
}
