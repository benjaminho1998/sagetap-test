import React from 'react';
import App from './App';
import Header from '../Header/Header';
import Content from '../Content/Content';
import { shallow } from 'enzyme';

describe('App Component', () => {
  it('renders Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);  
  });

  it('renders Content component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Content />)).toEqual(true);  
  });
});
