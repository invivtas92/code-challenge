import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

vi.stubEnv('VITE_API_URL', 'FakeApiUrl');

afterEach(() => {
  cleanup();
});
