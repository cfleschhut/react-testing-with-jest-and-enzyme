import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Counter from './Counter';

describe('Counter component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<Counter />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('starts with a count of 0', () => {
    const wrapper = shallow(<Counter />);
    // const countState = wrapper.state().count;

    const text = wrapper.find('span').text();
    expect(text).toEqual('0');
  });

  it('can increment the count when the button is clicked', () => {
    const wrapper = shallow(<Counter />);
    const incrementBtn = wrapper.find('button.increment');

    incrementBtn.simulate('click');

    const text = wrapper.find('span').text();
    expect(text).toEqual('1');
  });

  it('can decrement the count when the button is clicked', () => {
    const wrapper = shallow(<Counter />);
    const decrementBtn = wrapper.find('button.decrement');

    decrementBtn.simulate('click');

    const text = wrapper.find('span').text();
    expect(text).toEqual('-1');
  });
});
