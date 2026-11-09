// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

NativeModules.ImageCropPicker = {
    openPicker: jest.fn(),
    openCamera: jest.fn().mockReturnValue(Promise.resolve({})),
    openCropper: jest.fn(),
    clean: jest.fn(),
    cleanSingle: jest.fn()
};