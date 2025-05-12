import { render, RenderResult } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { expect, Mock, test, vi } from 'vitest';
import { AccountCard } from './AccountCard';
import { AdjustedData } from '../hooks/useAccounts';

interface TestFixtures {
  setup: () => { 
    screen: RenderResult,
    makePaymentFn: Mock,
    user: UserEvent,
    makePaymentButton: HTMLElement | null,
    testData: AdjustedData,
  }
}

const AccountCardTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(() => {
      const makePaymentFn = vi.fn();
      const testData: AdjustedData = {
        id: 'A-0002',
        type: 'GAS',
        address: '74 Taltarni Rd, Yawong Hills, 3478, Victoria',
        volume: 3034,
        balance: 30
      };
      const screen = render(<AccountCard onPayClick={makePaymentFn} id={testData.id} type={testData.type} address={testData.address} balance={testData.balance} />);
      const user = userEvent.setup();
      const makePaymentButton = screen.queryByRole('button', { name: /Make a payment/i });

      return {
        screen,
        user,
        makePaymentFn,
        makePaymentButton,
        testData,
      };
    });
  }
});

AccountCardTest('Correctly renders AccountCard component', ({ setup }) => {
  const { screen, testData, makePaymentButton } = setup();

  screen.getByText(`$${testData.balance}`);
  screen.getByText(testData.id);
  screen.getByText(testData.address);
  screen.getByText(testData.type);
  screen.getByAltText(`Icon for ${testData.id}`);
  expect(makePaymentButton).not.toEqual(null);
});

AccountCardTest('Correctly calls the payment click handler on click', async ({ setup }) => {
  const { testData, user, makePaymentButton, makePaymentFn } = setup();

  expect(makePaymentButton).not.toEqual(null);
  
  if (makePaymentButton) {
    await user.click(makePaymentButton);
    expect(makePaymentFn).toHaveBeenCalledOnce();
    expect(makePaymentFn.mock.calls[0]).toEqual([testData.id]);
  }
});

