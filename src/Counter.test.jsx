import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

it('starts with a count of 0', () => {
  const wrapper = shallow(<Counter />);
  // const countState = wrapper.state().count;
  const text = wrapper.find('span').text();

  expect(text).toEqual('0');
});
