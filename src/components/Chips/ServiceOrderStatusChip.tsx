import { PropsWithChildren } from "react";
import { Chip } from "@mui/material";

import { ServiceOrderStatus } from "../../enums/service-order-status.enum";
import { serviceOrderStatusOptions } from "../Autocomplete/ServiceOrderStatusAutocomplete";

export function ServiceOrderStatusChip({ children }: PropsWithChildren) {
  const label = serviceOrderStatusOptions.find(
    (o) => o.key === children
  )?.label;

  switch (children) {
    case ServiceOrderStatus.Open:
      return <Chip color="success" label={label} variant="outlined" />;
    case ServiceOrderStatus.InProgress:
      return <Chip color="info" label={label} variant="outlined" />;
    case ServiceOrderStatus.Quotation:
      return <Chip color="default" label={label} variant="outlined" />;
    case ServiceOrderStatus.Approved:
      return <Chip color="secondary" label={label} variant="outlined" />;
    case ServiceOrderStatus.Rejected:
      return <Chip color="error" label={label} variant="outlined" />;
    case ServiceOrderStatus.Completed:
      return <Chip color="primary" label={label} variant="outlined" />;
    case ServiceOrderStatus.Invoiced:
      return <Chip color="warning" label={label} variant="outlined" />;
    default:
      return null;
  }
}
