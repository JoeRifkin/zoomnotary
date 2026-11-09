// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('../../framework/src/StorageProvider', () => ({
    StorageProvider: jest.fn(),
    get:jest.fn(),
    set:jest.fn(),
    getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}))
jest.mock('../../framework/src/StorageProvider', () => ({
    StorageProvider: jest.fn(),
    get:jest.fn(),
    set:jest.fn(),
    getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}))
jest.mock('react-native-select-dropdown', () => ({
 
  SelectDropdown:jest.fn()
}));
function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock
