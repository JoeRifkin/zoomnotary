// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';
jest.useFakeTimers()
configure({ adapter: new Adapter() });

NativeModules.RNCAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
};

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-element-dropdown', () => {
  return {
    Dropdown: () => 'Dropdown',
    onchange:jest.fn()
  };
})
jest.mock("react-native-calendars",()=>{
  return{
      CalendarProvider:jest.fn(),
      ExpandableCalendar:jest.fn(),
      Calendar:jest.fn()
  }
})
jest.mock('react-native-date-picker', () => 'DatePicker');

jest.mock('@onfido/react-native-sdk',()=>({
  Onfido:{start:jest.fn()},
  OnfidoCaptureType:jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

jest.mock('react-native-modal-datetime-picker', () => {
  const MockDateTimePicker = ({ isVisible, onConfirm, onCancel }) => {
    if (isVisible) {
      onConfirm(new Date(2023, 0, 1)); 
    }
    return null;
  };
  return MockDateTimePicker;
});

jest.mock("react-native-file-viewer", () => ({
  open: jest.fn(),
}));
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/path/to/documents',
  DownloadDirectoryPath: '/path/to/downloads',
  exists: jest.fn(),
  downloadFile: jest.fn(),

    statusCode: 200,
}));

jest.mock('@stripe/stripe-react-native', () => ({
  PlatformPay: {},
  isPlatformPaySupported: jest.fn(),
  confirmPlatformPayPayment: jest.fn(),
  createPlatformPayPaymentMethod: jest.fn(),
}));

