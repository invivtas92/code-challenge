import { QueryKeys } from "../types";
import { DueChargesRepository } from "./dueCharges.repository.abstract";

const DUE_CHARGES_KEY = 'dueCharges'

export const DUE_CHARGES_QUERY_KEYS: QueryKeys<DueChargesRepository> = {
  getDueCharges: [DUE_CHARGES_KEY]
};