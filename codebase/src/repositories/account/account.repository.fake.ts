import { AccountRepository } from "./account.repository.abstract";
import { GetAccountsDTO } from "./dtos/getAccounts.dto";

export class FakeAccountRepository extends AccountRepository {
  #getAccountsRes: GetAccountsDTO = [];

  get getAccountsRes(): GetAccountsDTO {
    return this.#getAccountsRes;
  }
  
  set getAccountsRes(getAccountsRes: GetAccountsDTO) {
    this.#getAccountsRes = getAccountsRes;
  }

  getAccounts(): Promise<GetAccountsDTO> {
    return new Promise(resolve => { 
      resolve(this.#getAccountsRes); 
    });
  }
}