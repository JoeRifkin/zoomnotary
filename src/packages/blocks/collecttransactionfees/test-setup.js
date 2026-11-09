// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("../../framework/src/StorageProvider", () => ({
    get: jest.fn().mockImplementation(() => "token"),
}));

jest.mock("react-native-permissions", () => {

});

const entries = jest.fn()
const append = jest.fn()

global.FormData = () => ({ entries, append })