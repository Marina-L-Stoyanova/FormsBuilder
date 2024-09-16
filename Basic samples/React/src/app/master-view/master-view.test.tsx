import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import MasterView from './master-view';
import 'element-internals-polyfill';

// Mock API response
const mockResponse = {
  json: () => new Promise((resolve) => resolve({}))
};
global.fetch = vi.fn().mockResolvedValue(mockResponse);

test('renders MasterView component', () => {
  const wrapper = render(<MasterView />);
  expect(wrapper).toBeTruthy();
});