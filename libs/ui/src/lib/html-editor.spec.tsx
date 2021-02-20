import React from 'react';
import { render } from '@testing-library/react';

import HtmlEditor from './html-editor';

describe('HtmlEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HtmlEditor />);
    expect(baseElement).toBeTruthy();
  });
});
