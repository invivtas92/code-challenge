import { GetAccountsDTO } from "./dtos/getAccounts.dto";

export abstract class AccountRepository {
  abstract getAccounts(): Promise<GetAccountsDTO>
};
