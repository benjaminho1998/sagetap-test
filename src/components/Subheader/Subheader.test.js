import React from 'react';
import IconButton from '@mui/material/IconButton';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Subheader from './Subheader';

describe('Subheader Component', () => {
  it('should call handleShow', () => {
    const handleShowSpy = jest.fn();
    render(
        <IconButton onClick={handleShowSpy} />
    );
    fireEvent.click(screen.queryByRole('button'));
    expect(handleShowSpy).toHaveBeenCalled();
  });

  it('renders snapshot correctly with props', () => {
    const handleShow = jest.fn();
    const tree = renderer.create(<Subheader handleShow={handleShow} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
