import React from 'react';
import { render } from '@testing-library/react';

import HtmlPreview from './html-preview';

describe('HtmlPreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HtmlPreview />);
    expect(baseElement).toBeTruthy();
  });
});
