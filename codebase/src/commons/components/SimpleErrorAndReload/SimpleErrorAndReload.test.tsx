// import { createTestRouter } from '@tests/createTestRouter';
// import { SimpleErrorAndReload } from './SimpleErrorAndReload';
// import { render, RenderResult } from '@testing-library/react';
// import userEvent, { UserEvent } from '@testing-library/user-event';
// import { expect, Mock, test, vi } from 'vitest';

// interface TestFixtures {
//   setup: () => { 
//     screen: RenderResult
//     error: Error
//     pageName: string
//     reloadFn: Mock
//     reloadButton: HTMLElement | null
//     user: UserEvent
//   }
// }

// const SimpleErrorAndReloadTest = test.extend<TestFixtures>({
//   setup: async ({}, vitestUse) => {
//     // setup the fixture before each test function
//     // return the fixture value
//     await vitestUse(() => {
//       const error = new Error('error message');
//       const pageName = 'Test Page';
//       const reloadFn = vi.fn();

//       const router = createTestRouter({
//         component: <SimpleErrorAndReload error={error} pageName={pageName} reload={reloadFn} />,
//         routePath: '/',
//         currentPath: '/'
//       });
  
//       const screen = render(router);
//       // can also specify string for name below e.g. 'Reload' which only returns button containing the exact text 'Reload'
//       const reloadButton = screen.queryByRole('button', { name: /reload/i });
//       const user = userEvent.setup();

//       return {
//         screen,
//         error,
//         pageName,
//         reloadFn,
//         reloadButton,
//         user
//       };
//     });

//     // cleanup the fixture after each test function
//   }
// });

// SimpleErrorAndReloadTest('Correctly renders SimpleErrorAndReload component', ({ setup }) => {
//   const { screen, error, pageName, reloadButton } = setup();
//   screen.getByText(error.message);
  
//   screen.getByText(`Something went wrong in ${pageName}`, { exact: false });
//   expect(reloadButton).not.toEqual(null);
// });

// SimpleErrorAndReloadTest('Correctly calls provided reload function when reload button is clicked', async ({ setup }) => {
//   const { user, reloadButton, reloadFn } = setup();
  
//   expect(reloadButton).not.toEqual(null);
//   if (reloadButton) {
//     await user.click(reloadButton);
//     expect(reloadFn).toHaveBeenCalledOnce();
//   }
// });
