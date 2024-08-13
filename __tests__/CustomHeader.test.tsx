import React from 'react';
import {render} from '@testing-library/react-native';
import CustomHeader from '@components/CustomHeader/component';

describe('CustomHeader', () => {
  it('renders title', () => {
    const title = 'Test Title';
    const {getByText} = render(<CustomHeader title={title} />);
    expect(getByText(title)).toBeTruthy();
  });

  it('renders with empty title', () => {
    const {getByText} = render(<CustomHeader title="" />);
    expect(getByText('')).toBeTruthy();
  });
});
