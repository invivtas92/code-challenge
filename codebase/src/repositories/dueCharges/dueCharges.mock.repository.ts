import { GetDueChargesDTO } from "./dtos/getDueCharges.dto";
import { DueChargesRepository } from "./dueCharges.repository.abstract";

const dueCharges: GetDueChargesDTO = [
  { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
  { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 },
  { id: "D-0003", accountId: "A-0003", date: "2025-03-25", amount: -15 },
  { id: "D-0004", accountId: "A-0003", date: "2025-04-05", amount: -25 },

  { id: "D-0005", accountId: "A-0004", date: "2025-03-30", amount: 20 },
  { id: "D-0006", accountId: "A-0004", date: "2025-04-06", amount: 15 },
  { id: "D-0007", accountId: "A-0004", date: "2025-04-13", amount: 15 },

  { id: "D-0008", accountId: "A-0005", date: "2025-04-04", amount: 10 },
  { id: "D-0009", accountId: "A-0005", date: "2025-04-11", amount: 15 },

  { id: "D-0010", accountId: "A-0006", date: "2025-04-01", amount: -5 },
  { id: "D-0011", accountId: "A-0006", date: "2025-04-09", amount: -10 },

  { id: "D-0012", accountId: "A-0008", date: "2025-03-31", amount: 40 },
  { id: "D-0013", accountId: "A-0008", date: "2025-04-07", amount: 40 },
  { id: "D-0014", accountId: "A-0008", date: "2025-04-14", amount: 40 },

  { id: "D-0015", accountId: "A-0009", date: "2025-04-02", amount: -30 },
  { id: "D-0016", accountId: "A-0009", date: "2025-04-12", amount: -30 },
];

class MockDueChargesRepository extends DueChargesRepository {
  async getDueCharges(): Promise<GetDueChargesDTO> {
    return new Promise<GetDueChargesDTO>((resolve) => {
      setTimeout(() => {
        resolve(dueCharges);
      }, 1000);
    });
  }
}

/**
 * TODO: Introduce DI Container later to manage and inject dependencies, for now create and export an
 * instance of MockAccountRepository to be imported and used throughout the codebase
 */

const mockDueChargesRepository = new MockDueChargesRepository();
export { mockDueChargesRepository, MockDueChargesRepository };