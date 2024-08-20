import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import MasterView from './master-view';
import 'element-internals-polyfill';

test('renders MasterView component', () => {
    const wrapper = render(<MasterView />);
    expect(wrapper).toBeTruthy();
});