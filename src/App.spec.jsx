import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import axios from 'axios';
import App, { Counter, dataReducer, counterReducer } from './App';

const list = ['a', 'b', 'c'];

xdescribe('App', () => {
  describe('Reducer', () => {
    it('should set a list', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, { type: 'SET_LIST', list });

      expect(newState).toEqual({ list: ['a', 'b', 'c'], error: null });
    });

    it('should set the error', () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, { type: 'SET_ERROR' });

      expect(newState.error).toBeTruthy();
    });

    it('should reset the error if list is set', () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, { type: 'SET_LIST', list });

      expect(newState).toEqual({ list, error: null });
    });
  });

  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  xit('renders the inner Counter', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(Counter).length).toEqual(1);
  });

  xit('passes all props to Counter', () => {
    const wrapper = mount(<App />);
    const counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.find('p').text()).toEqual('0');
  });

  xit('increments the counter', () => {
    const wrapper = mount(<App />);

    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toEqual('1');
  });

  xit('decrements the counter', () => {
    const wrapper = mount(<App />);

    wrapper
      .find('button')
      .at(1)
      .simulate('click');

    const counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.find('p').text()).toEqual('-1');
  });

  xit('fetches async data', done => {
    const promise = new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            data: {
              hits: [
                { objectID: '1', title: 'a' },
                { objectID: '2', title: 'b' },
              ],
            },
          }),
        100,
      ),
    );

    axios.get = jest.fn(() => promise);

    const wrapper = mount(<App />);

    expect(wrapper.find('li').length).toEqual(0);

    promise.then(() => {
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find('li').length).toEqual(2);

        axios.get.mockClear();
        done();
      });
    });
  });

  xit('fetches async data but fails', done => {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error()), 100),
    );

    axios.get = jest.fn(() => promise);

    const wrapper = mount(<App />);

    expect(wrapper.find('li').length).toEqual(0);

    promise.catch(() => {
      setImmediate(() => {
        wrapper.update();
        expect(wrapper.find('li').length).toEqual(0);

        expect(wrapper.find('.error').length).toEqual(1);

        axios.get.mockClear();
        done();
      });
    });
  });
});

describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Counter counter={1} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('increments the counter state', () => {
    const initialState = { count: 0 };
    const action = { type: 'INCREASE' };

    const result = counterReducer(initialState, action);

    expect(result).toEqual({ count: 1 });
    // expect(counterReducer(state, { type: 'DECREASE' })).toEqual({ count: -1 });
    // expect(counterReducer(state, { type: 'UNMATCHING_ACTION' })).toEqual({
    //   count: 0,
    // });
  });
});
