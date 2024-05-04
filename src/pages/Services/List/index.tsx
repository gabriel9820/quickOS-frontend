import { useEffect } from "react";
import { Box } from "@mui/material";

import { getAllServices } from "../../../store/services/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { handleError } from "../../../utils/error-handler";
import { columns } from "./constants";
import { DataTable } from "../../../components/DataTable";
import { ListTitle } from "../../../components/ListTitle";

export function ServicesListPage() {
  const { services, isLoading } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(getAllServices());
    } catch (error) {
      handleError(error, dispatch);
    }
  }, [dispatch]);

  return (
    <Box>
      <ListTitle>Serviços</ListTitle>
      <DataTable rows={services.data} columns={columns} loading={isLoading} />
    </Box>
  );
}
