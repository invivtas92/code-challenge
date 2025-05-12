import { AccountRepository } from "./account.repository.abstract";
import { GetAccountsDTO } from "./dtos/getAccounts.dto";

const accounts: GetAccountsDTO = [
  {
    id: "A-0001",
    type: "ELECTRICITY",
    address: "1 Greville Ct, Thomastown, 3076, Victoria",
    meterNumber: "1234567890",
  },
  {
    id: "A-0002",
    type: "GAS",
    address: "74 Taltarni Rd, Yawong Hills, 3478, Victoria",
    volume: 3034
  },
  {
    id: "A-0003",
    type: "ELECTRICITY",
    address: "44 William Road, Cresswell Downs, 0862, Northern Territory",
    meterNumber: "12345672313",
  },
  {
    id: "A-0004",
    type: "ELECTRICITY",
    address: "87 Carolina Park Road, Forresters Beach, 2260, New South Wales",
    meterNumber: "12345671244",
  },
  {
    id: "A-0005",
    type: "GAS",
    address: "12 Sunset Blvd, Redcliffe, 4020, Queensland",
    volume: 1900
  },
  {
    id: "A-0006",
    type: "ELECTRICITY",
    address: "3 Ocean View Dr, Torquay, 3228, Victoria",
    meterNumber: "12412421244",
  },
  {
    id: "A-0007",
    type: "GAS",
    address: "150 Greenway Cres, Mawson Lakes, 5095, South Australia",
    volume: 1853
  },
  {
    id: "A-0008",
    type: "ELECTRICITY",
    address: "88 Harbour St, Sydney, 2000, New South Wales",
    meterNumber: "22223141443",
  },
  {
    id: "A-0009",
    type: "GAS",
    address: "22 Boulder Rd, Kalgoorlie, 6430, Western Australia",
    volume: 1000
  },
];

class MockAccountRepository extends AccountRepository {
  async getAccounts(): Promise<GetAccountsDTO> {
    return new Promise<GetAccountsDTO>((resolve) => {
      setTimeout(() => {
        resolve(accounts);
      }, 1000);
    });
  }
}

/**
 * TODO: Introduce DI Container later to manage and inject dependencies, for now create and export an
 * instance of MockAccountRepository to be imported and used throughout the codebase
 */

const mockAccountRepository = new MockAccountRepository();
export { mockAccountRepository, MockAccountRepository };