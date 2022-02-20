import React from 'react';
import renderer from 'react-test-renderer';
import AvatarIcon from './AvatarIcon';

describe('AvatarIcon Component', () => {
  it('renders snapshot correctly with props', () => {
    const name = 'Benjamin Ho';
    const tree = renderer.create(<AvatarIcon name={name} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
