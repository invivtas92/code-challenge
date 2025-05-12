import { QueryKeys } from "../types";
import { AccountRepository } from "./account.repository.abstract"

const ACCOUNTS_QUERY_KEY = 'accounts';

export const ACCOUNT_QUERY_KEYS: QueryKeys<AccountRepository> = {
  getAccounts: [ACCOUNTS_QUERY_KEY],
};