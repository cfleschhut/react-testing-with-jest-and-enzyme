import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock-jest';
import 'whatwg-fetch';

configure({ adapter: new Adapter() });

afterEach(fetchMock.restore);
