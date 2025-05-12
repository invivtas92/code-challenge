import { createTestRouter } from '@tests/createTestRouter';
import { SimpleErrorAndReload } from './SimpleErrorAndReload';
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { expect, Mock, test, vi } from 'vitest';

interface TestFixtures {
  setup: () => { 
    screen: RenderResult,
    error: Error,
    pageName: string,
    reloadFn: Mock,
    user: UserEvent,
  }
}

const SimpleErrorAndReloadTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(() => {
      const error = new Error('error message');
      const pageName = 'Test Page';
      const reloadFn = vi.fn();

      const router = createTestRouter({
        component: <SimpleErrorAndReload error={error} pageName={pageName} reload={reloadFn} />,
        routePath: '/',
        currentPath: '/'
      });
      const screen = render(router);
      const user = userEvent.setup();

      return {
        screen,
        error,
        pageName,
        reloadFn,
        user
      };
    });
  }
});

SimpleErrorAndReloadTest('Correctly renders SimpleErrorAndReload component', async ({ setup }) => {
  const { screen, error, pageName } = setup();
  await waitFor(() => {
    // wait for tanstack router to render content
    expect(screen.baseElement.childNodes[0].hasChildNodes()).toEqual(true);
  });

  const reloadButton = screen.queryByRole('button', { name: /reload/i });

  screen.getByText(error.message);
  
  screen.getByText(`Something went wrong in ${pageName}`, { exact: false });
  expect(reloadButton).not.toEqual(null);
});

SimpleErrorAndReloadTest('Correctly calls provided reload function when reload button is clicked', async ({ setup }) => {
  const { user, reloadFn, screen } = setup();
  await waitFor(() => screen.baseElement.childNodes[0].hasChildNodes());
 
  const reloadButton = screen.queryByRole('button', { name: /reload/i });

  expect(reloadButton).not.toEqual(null);
  if (reloadButton) {
    await user.click(reloadButton);
    expect(reloadFn).toHaveBeenCalledOnce();
  }
});
