// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

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

jest.mock("../../framework/src/StorageProvider", () => {
  let store = {};
  return {
    set: (key, value) => {
      store[key] = value.toString();
    },
    get: (key) => store[key],
    remove: (key) => {
      delete store[key];
    },
    reset: () => {
      store = {};
    },
  };
});


jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));


jest.mock('react-native-webview', () => {
    const mockWebView = (props) => {
        return <div {...props} />;
    };

    return {
        __esModule: true,
        default: mockWebView,
    };
});

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-element-dropdown', () => {
  return {
    Dropdown: () => 'Dropdown',
  };
})
jest.mock('react-native-date-picker', () => 'DatePicker');
jest.mock("react-native-elements", () => ({
  Avatar: jest.fn(),
}));



jest.mock('@react-native-community/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    isSignedIn: jest.fn().mockResolvedValue(true),  // Simulating the promise resolving to true
    hasPlayServices: jest.fn().mockResolvedValue(true),
    getTokens: jest.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      idToken: 'mockIdToken',
    }),
    signIn: jest.fn().mockResolvedValue({
      idToken: 'mockIdToken',
      serverAuthCode: 'mockServerAuthCode',
      scopes: [],
      user: {
        email: 'mockEmail',
        id: 'mockId',
        givenName: 'mockGivenName',
        familyName: 'mockFamilyName',
        photo: null,
        name: 'mockFullName',
      },
    }),
    signOut: jest.fn().mockResolvedValue(true),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'mock_SIGN_IN_CANCELLED',
    IN_PROGRESS: 'mock_IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'mock_PLAY_SERVICES_NOT_AVAILABLE',
    SIGN_IN_REQUIRED: 'mock_SIGN_IN_REQUIRED',
  },
}));

jest.mock('react-native-app-auth', () => ({
  authorize: jest.fn().mockResolvedValue({
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken',
    idToken: 'mockIdToken',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'openid profile email',
  }),
  refresh: jest.fn().mockResolvedValue({
    accessToken: 'mockNewAccessToken',
    refreshToken: 'mockNewRefreshToken',
    idToken: 'mockNewIdToken',
    tokenType: 'Bearer',
    expiresIn: 3600,
    scope: 'openid profile email',
  }),
  revoke: jest.fn().mockResolvedValue(true),
  logout: jest.fn().mockResolvedValue(true),
}));
