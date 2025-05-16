import { render, RenderResult } from '@testing-library/react';
import { expect, Mock, test, vi } from 'vitest';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { SimpleModal } from './SimpleModal';

interface TestProps {
  isOpen: boolean
}

interface TestFixtures {
  setup: (props: TestProps) => { 
    screen: RenderResult,
    onCloseFn: Mock,
    user: UserEvent,
    closeButton: HTMLElement | null,
    modalContent: HTMLElement | null,
  }
}

const SimpleModalTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(({ isOpen }) => {
      const modalContentString = 'Modal Test Content';
      const onCloseFn = vi.fn();
      const screen = render(<SimpleModal isOpen={isOpen} onClose={onCloseFn}>
        <div>{modalContentString}</div>
      </SimpleModal>);
      const user = userEvent.setup();
      const closeButton = screen.queryByRole('button', { name: /Close/i });
      const modalContent = screen.queryByText(modalContentString);

      return {
        screen,
        user,
        closeButton,
        onCloseFn,
        modalContent,
      };
    });
  }
});

SimpleModalTest('Renders simple modal component and its contents when it is open', ({ setup }) => {
  const { closeButton, modalContent } = setup({ isOpen: true });

  expect(modalContent).not.toEqual(null);
  expect(closeButton).not.toEqual(null);
});

SimpleModalTest('Does not render modal when it is closed', ({ setup }) => {
  const { modalContent, closeButton } = setup({ isOpen: false });

  expect(closeButton).toEqual(null);
  expect(modalContent).toEqual(null);
});

SimpleModalTest('Calls onClose fn when close button is clicked', async ({ setup }) => {
  const { onCloseFn, closeButton, user } = setup({ isOpen: true });

  expect(closeButton).not.toEqual(null);

  if (closeButton) {
    await user.click(closeButton);
    expect(onCloseFn).toHaveBeenCalledOnce();
  }
});

