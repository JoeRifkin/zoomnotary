// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("@react-native-community/google-signin", () => ({
  GoogleSignin: {
    configure: jest.fn()
  },
  statusCodes: ""
}));

jest.mock("react-native-fbsdk", () => ({
  LoginManager: {
    logInWithPermissions: jest
      .fn()
      .mockImplementation(() => Promise.resolve(""))
  },
  AccessToken: {
    getCurrentAccessToken:  jest
    .fn()
    .mockImplementation(() => Promise.resolve({accessToken: "access-token-string"}))
  }
}));
