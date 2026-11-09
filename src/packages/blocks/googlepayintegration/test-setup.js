// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock(
    "../../../node_modules/@builder/run-engine/node_modules/@react-native-async-storage/async-storage",
    () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock('@stripe/stripe-react-native', () => ({
    PlatformPay: {},
    isPlatformPaySupported: jest.fn(),
    confirmPlatformPayPayment: jest.fn(),
    createPlatformPayPaymentMethod: jest.fn(),
  }));
  