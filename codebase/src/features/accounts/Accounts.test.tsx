import { render, RenderResult } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Accounts } from './Accounts';
import { accountsLng } from '@tests/locales/en';
import { createWrapperWithTestI18n } from '@tests/createWrapperWithTestI18n';

interface TestFixtures {
  setup: () => { 
    screen: RenderResult
  }
}

const AccountsTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(() => {
      const onPayClick = vi.fn();
      const accounts = createWrapperWithTestI18n({
        children: <Accounts data={[]} onPayClick={onPayClick}/>
      })
      const screen = render(accounts);

      return {
        screen,
      };
    });
  }
});

AccountsTest('Correctly renders Accounts component', ({ setup }) => {
  const { screen } = setup();

  screen.getByText(accountsLng.accounts);
});

