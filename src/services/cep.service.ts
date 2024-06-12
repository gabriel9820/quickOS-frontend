import { api } from "./api";
import { AddressOutputModel } from "../models/address.model";

export async function getAddressByCepAsync(cep: string) {
  return api.get<AddressOutputModel>(`/cep/${cep}`);
}
