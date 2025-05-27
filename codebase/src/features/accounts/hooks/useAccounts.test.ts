import { useAccounts } from './useAccounts';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FakeAccountRepository } from '@repositories/account/account.repository.fake';
import { FakeDueChargesRepository } from '@repositories/dueCharges/dueCharges.repository.fake';
import { GetAccountsDTO } from '@repositories/account/dtos/getAccounts.dto';
import { GetDueChargesDTO } from '@repositories/dueCharges/dtos/getDueCharges.dto';

// interface TestFixtures {
//   setup: () => { 
//     fakeDueChargesRepo: FakeDueChargesRepository,
//     fakeAccountsRepo: FakeAccountRepository,
//     testAccounts: GetAccountsDTO,
//     testDueCharges: GetDueChargesDTO,
//   }
// }

// const UseAccountsTest = test.extend<TestFixtures>({
//   setup: async ({}, vitestUse) => {
//     await vitestUse(() => {
//       const fakeAccountsRepo = new FakeAccountRepository();
//       const fakeDueChargesRepo = new FakeDueChargesRepository();

//       const testAccounts: GetAccountsDTO = [
//         {
//           id: 'A-0001',
//           type: 'ELECTRICITY',
//           address: '87 Carolina Park Road, Forresters Beach, 2260, New South Wales',
//           meterNumber: '12345671244',
//         },
//         {
//           id: 'A-0002',
//           type: 'GAS',
//           address: '12 Sunset Blvd, Redcliffe, 4020, Queensland',
//           volume: 1900
//         },
//       ];
//       fakeAccountsRepo.getAccountsRes = testAccounts;
//       const testDueCharges: GetDueChargesDTO =  [
//         { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
//         { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 },
//       ];
//       fakeDueChargesRepo.getDueChargesRes = testDueCharges;

//       return {
//         fakeDueChargesRepo,
//         fakeAccountsRepo,
//         testDueCharges,
//         testAccounts
//       };
//     });
//   }
// });

// UseAccountsTest('Returns correct accounts data with balance, refetchData fn and react query props', async ({ setup }) => {
//   const { testAccounts, testDueCharges, fakeAccountsRepo, fakeDueChargesRepo } = setup();

//   const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));

//   const { result } = hook;

//   await waitFor(() => {
//     expect(result.current.data).toBeDefined();
//   });

//   const { isFetching, isSuccess, data, error, refetchData } = result.current;

//   expect(isFetching).toBeTypeOf('boolean');
//   expect(isSuccess).toBeTypeOf('boolean');
//   expect(refetchData).toBeTypeOf('function');
//   expect(error).toEqual({
//     accounts: null,
//     dueCharges: null
//   });

//   expect(data).toBeDefined();
//   if (data) {
//     data.forEach((d, index) => {
//       expect(d.id).toEqual(testAccounts[index].id);
//       if (d.id === testDueCharges[0].accountId) {
//         // test due charges data only contains changes for 1 account so only make sure that account balance is updated
//         expect(d.balance).toEqual(testDueCharges.reduce((acc, dueCharges) => {
//           return acc + dueCharges.amount;
//         }, 0))
//       } else {
//         // no due charges for other account so it should be set to the default 0
//         expect(d.balance).toEqual(0);
//       }
//     });
//   }
// });

// UseAccountsTest('Returns data containing empty array when account repository getAccounts() returns 0 accounts', async ({ setup }) => {
//   const { fakeAccountsRepo, fakeDueChargesRepo } = setup();

//   fakeAccountsRepo.getAccountsRes = [];

//   const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));

//   const { result } = hook;

//   await waitFor(() => {
//     expect(result.current.data).toBeDefined();
//   });

//   const { data } = result.current;

//   expect(data).toEqual([]);
// });

// UseAccountsTest('Returns data containing accounts array with their balance set to 0 when due charges repository getDueCharges() returns 0 due charges', async ({ setup }) => {
//   const { fakeAccountsRepo, fakeDueChargesRepo, testAccounts } = setup();

//   fakeDueChargesRepo.getDueChargesRes = [];

//   const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));

//   const { result } = hook;

//   await waitFor(() => {
//     expect(result.current.data).toBeDefined();
//   });

//   const { data } = result.current;

//   expect(data).toBeDefined();
//   if (data) {
//     expect(data.length).toEqual(testAccounts.length);
//     data.forEach((account) => {
//       expect(account.balance).toEqual(0);
//     });
//   }
// });

describe('useAccounts', () => {
  const setup: () => { 
    fakeDueChargesRepo: FakeDueChargesRepository,
    fakeAccountsRepo: FakeAccountRepository,
    testAccounts: GetAccountsDTO,
    testDueCharges: GetDueChargesDTO,
  } = () => {
    const fakeAccountsRepo = new FakeAccountRepository();
    const fakeDueChargesRepo = new FakeDueChargesRepository();

    const testAccounts: GetAccountsDTO = [
      {
        id: 'A-0001',
        type: 'ELECTRICITY',
        address: '87 Carolina Park Road, Forresters Beach, 2260, New South Wales',
        meterNumber: '12345671244',
      },
      {
        id: 'A-0002',
        type: 'GAS',
        address: '12 Sunset Blvd, Redcliffe, 4020, Queensland',
        volume: 1900
      },
    ];
    fakeAccountsRepo.getAccountsRes = testAccounts;
    const testDueCharges: GetDueChargesDTO =  [
      { id: "D-0001", accountId: "A-0001", date: "2025-04-01", amount: 10 },
      { id: "D-0002", accountId: "A-0001", date: "2025-04-08", amount: 20 },
    ];
    fakeDueChargesRepo.getDueChargesRes = testDueCharges;

    return {
      fakeDueChargesRepo,
      fakeAccountsRepo,
      testDueCharges,
      testAccounts
    };
  };

  it('Returns correct accounts data with balance, refetchData fn and react query props', async () => {
    const { testAccounts, testDueCharges, fakeAccountsRepo, fakeDueChargesRepo } = setup();
  
    const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));
  
    const { result } = hook;
  
    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  
    const { isFetching, isSuccess, data, error, refetchData } = result.current;
  
    expect(isFetching).toBeTypeOf('boolean');
    expect(isSuccess).toBeTypeOf('boolean');
    expect(refetchData).toBeTypeOf('function');
    expect(error).toEqual({
      accounts: null,
      dueCharges: null
    });
  
    expect(data).toBeDefined();
    if (data) {
      data.forEach((d, index) => {
        expect(d.id).toEqual(testAccounts[index].id);
        if (d.id === testDueCharges[0].accountId) {
          // test due charges data only contains changes for 1 account so only make sure that account balance is updated
          expect(d.balance).toEqual(testDueCharges.reduce((acc, dueCharges) => {
            return acc + dueCharges.amount;
          }, 0))
        } else {
          // no due charges for other account so it should be set to the default 0
          expect(d.balance).toEqual(0);
        }
      });
    }
  });

  it('Returns data containing empty array when account repository getAccounts() returns 0 accounts', async () => {
    const { fakeAccountsRepo, fakeDueChargesRepo } = setup();

    fakeAccountsRepo.getAccountsRes = [];

    const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));

    const { result } = hook;

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    const { data } = result.current;

    expect(data).toEqual([]);
  });

  it('Returns data containing accounts array with their balance set to 0 when due charges repository getDueCharges() returns 0 due charges', async () => {
    const { fakeAccountsRepo, fakeDueChargesRepo, testAccounts } = setup();

    fakeDueChargesRepo.getDueChargesRes = [];

    const hook = renderHook(() => useAccounts({ accountRepository: fakeAccountsRepo, dueChargesRepository: fakeDueChargesRepo }));

    const { result } = hook;

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    const { data } = result.current;

    expect(data).toBeDefined();
    if (data) {
      expect(data.length).toEqual(testAccounts.length);
      data.forEach((account) => {
        expect(account.balance).toEqual(0);
      });
    }
  });
});