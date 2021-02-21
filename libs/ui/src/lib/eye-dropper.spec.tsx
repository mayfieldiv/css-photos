import React from 'react';
import { render } from '@testing-library/react';

import EyeDropper from './eye-dropper';

describe('EyeDropper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EyeDropper />);
    expect(baseElement).toBeTruthy();
  });
});
