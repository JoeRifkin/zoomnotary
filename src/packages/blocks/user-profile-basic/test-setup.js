// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("react-native-image-crop-picker", () => {
    return {
      openPicker: jest.fn(),
      openCamera: jest.fn(() => Promise.resolve("string")),
    };
  });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'android',
    select: () => null
}));

function FormDataMock() {
    this.append = jest.fn();
  }
  global.FormData = FormDataMock;