import { SimpleErrorAndReload } from './SimpleErrorAndReload';
import { render, RenderResult } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { expect, Mock, test, vi } from 'vitest';

interface TestFixtures {
  setup: () => { 
    screen: RenderResult,
    error: Error,
    pageName: string,
    reloadFn: Mock,
    user: UserEvent,
    reloadButton: HTMLElement | null
  }
}

const SimpleErrorAndReloadTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(() => {
      const error = new Error('error message');
      const pageName = 'Test Page';
      const reloadFn = vi.fn();

      const screen = render(<SimpleErrorAndReload error={error} pageName={pageName} reload={reloadFn} />);
      const user = userEvent.setup();

      const reloadButton = screen.queryByRole('button', { name: /reload/i });

      return {
        screen,
        error,
        pageName,
        reloadFn,
        user,
        reloadButton
      };
    });
  }
});

SimpleErrorAndReloadTest('Correctly renders SimpleErrorAndReload component', ({ setup }) => {
  const { screen, error, pageName, reloadButton } = setup();

  screen.getByText(error.message);
  
  screen.getByText(`Something went wrong in ${pageName}`, { exact: false });
  expect(reloadButton).not.toEqual(null);
});

SimpleErrorAndReloadTest('Correctly calls provided reload function when reload button is clicked', async ({ setup }) => {
  const { user, reloadFn, reloadButton } = setup();

  expect(reloadButton).not.toEqual(null);
  if (reloadButton) {
    await user.click(reloadButton);
    expect(reloadFn).toHaveBeenCalledOnce();
  }
});
