// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });




jest.mock('react-navigation', () => ({
    NavigationEvents: jest.fn(),
}));
jest.mock("react-native-vector-icons/FontAwesome", () => ({
    Icon: jest.fn(),
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@onfido/react-native-sdk',()=>({
    Onfido:{start:jest.fn()},
    OnfidoCaptureType:jest.fn()
}));
import { NativeModules } from 'react-native';

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
NativeModules.RNCNetInfo = {
    getCurrentConnectivity: jest.fn(),
    isConnectionMetered: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn()
};
NativeModules.RNCGeolocation = {
    addListener: jest.fn(),
    getCurrentPosition: jest.fn(),
    removeListeners: jest.fn(),
    requestAuthorization: jest.fn(),
    setConfiguration: jest.fn(),
    startObserving: jest.fn(),
    stopObserving: jest.fn()
};
NativeModules.RNGestureHandlerModule = {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
}

jest.mock("react-native-file-viewer", () => ({
    open: jest.fn(),
  }));
  jest.mock("react-native-fs", () => ({
    DocumentDirectoryPath: "",
    DownloadDirectoryPath: "",
    downloadFile: jest.fn().mockImplementation(() => ({
      promise: Promise.resolve({ statusCode: 200 }),
    })),
  }));
