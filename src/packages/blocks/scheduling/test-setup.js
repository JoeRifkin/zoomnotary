// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mock from "react-native-permissions/mock";
configure({ adapter: new Adapter() });

jest.mock("react-native-permissions", () => {
  return mock;
});

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native-elements", () => ({}));

jest.mock("react-native-calendars", () => ({}));

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
