import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllServicesAsync } from "../../services/service-provided.service";

export const getAllServices = createAsyncThunk("GET_ALL_SERVICES", async () => {
  const { data } = await getAllServicesAsync();
  return data;
});
