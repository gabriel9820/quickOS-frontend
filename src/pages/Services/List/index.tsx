import { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { deleteService, getAllServices } from "../../../store/services/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { columns } from "./constants";
import { DataTable } from "../../../components/DataTable";
import { ListTitle } from "../../../components/ListTitle";
import { DataTableActions } from "../../../components/DataTable/Actions";

export function ServicesListPage() {
  const { services, isLoading } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  function handleViewClick(externalId: string) {
    navigate(externalId, { state: { readOnly: true } });
  }

  function handleEditClick(externalId: string) {
    navigate(externalId, { state: { readOnly: false } });
  }

  async function handleDeleteClick(externalId: string) {
    dispatch(deleteService(externalId));
  }

  return (
    <Box>
      <ListTitle>Serviços</ListTitle>
      <DataTable
        rows={services.data}
        columns={columns}
        loading={isLoading}
        renderActions={({ id }) => (
          <DataTableActions
            onViewClick={() => handleViewClick(id.toString())}
            onEditClick={() => handleEditClick(id.toString())}
            onDeleteClick={() => handleDeleteClick(id.toString())}
          />
        )}
      />
    </Box>
  );
}
