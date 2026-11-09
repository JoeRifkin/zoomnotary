// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock("../../framework/src/StorageProvider", () => ({
    get: jest.fn().mockImplementation(() => "token"),
}));

jest.mock("react-native-vector-icons/FontAwesome", () => ({
    Icon: jest.fn(),
}));

jest.mock("react-native-elements", () => ({
    Avatar: jest.fn(),
}));
