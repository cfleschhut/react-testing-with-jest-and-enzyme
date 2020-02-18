import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock-jest';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import User from './User';

const nextTick = async () =>
  new Promise(resolve => {
    setTimeout(resolve, 0);
  });

const dummyUser = {
  id: 1,
  name: 'Jack Franklin',
  website: 'https://javascriptplayground.com',
};

const url = 'https://jsonplaceholder.typicode.com/users/1';

const mockUrlWithUser = user =>
  fetchMock.getOnce(url, {
    status: 200,
    body: user,
  });

describe('User', () => {
  it('shows the loading text before the data is fetched', async () => {
    mockUrlWithUser(dummyUser);

    const wrapper = shallow(<User id={1} />);
    expect(wrapper.find('p').text()).toEqual('Loading!');
  });

  it('shows the data once it has been fetched', async () => {
    mockUrlWithUser(dummyUser);

    const wrapper = shallow(<User id={1} />);

    await nextTick();
    wrapper.update();
    expect(wrapper.find('h4').text()).toEqual(dummyUser.name);
    expect(wrapper.find('p').text()).toContain(dummyUser.website);
  });
});
