// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock("../../framework/src/StorageProvider", () => ({
    get: jest.fn().mockImplementation(() => "token"),
}));

function FormDataMock() {
    this.append = jest.fn();
}
global.FormData = FormDataMock;

jest.mock('react-native-fs', () => {
    return {
      mkdir: jest.fn(),
      moveFile: jest.fn(),
      copyFile: jest.fn(),
      pathForBundle: jest.fn(),
      pathForGroup: jest.fn(),
      getFSInfo: jest.fn(),
      getAllExternalFilesDirs: jest.fn(),
      unlink: jest.fn(),
      exists: jest.fn(),
      stopDownload: jest.fn(),
      resumeDownload: jest.fn(),
      isResumable: jest.fn(),
      stopUpload: jest.fn(),
      completeHandlerIOS: jest.fn(),
      readDir: jest.fn(),
      readDirAssets: jest.fn(),
      existsAssets: jest.fn(),
      readdir: jest.fn(),
      setReadable: jest.fn(),
      stat: jest.fn(),
      readFile: jest.fn(),
      read: jest.fn(),
      readFileAssets: jest.fn(),
      hash: jest.fn(),
      copyFileAssets: jest.fn(),
      copyFileAssetsIOS: jest.fn(),
      copyAssetsVideoIOS: jest.fn(),
      writeFile: jest.fn(),
      appendFile: jest.fn(),
      write: jest.fn(),
      downloadFile: jest.fn(),
      uploadFiles: jest.fn(),
      touch: jest.fn(),
      MainBundlePath: jest.fn(),
      CachesDirectoryPath: jest.fn(),
      DocumentDirectoryPath: jest.fn(),
      ExternalDirectoryPath: jest.fn(),
      ExternalStorageDirectoryPath: jest.fn(),
      TemporaryDirectoryPath: jest.fn(),
      LibraryDirectoryPath: jest.fn(),
      PicturesDirectoryPath: jest.fn(),
    };
  });

jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: jest.fn(),
    openCamera: jest.fn(() => Promise.resolve("string")),
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

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
