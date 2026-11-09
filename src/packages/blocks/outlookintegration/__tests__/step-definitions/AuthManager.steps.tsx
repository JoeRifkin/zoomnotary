import { defineFeature, loadFeature } from "jest-cucumber";
import { AuthManagers } from "../../src/auth/AuthManagers";

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/AuthManager-scenario.feature"
);

jest.mock("react-native-app-auth", () => {
  return {
    authorize: () => {
      return true;
    },
    refresh: () => {
      return true;
    },
    AuthConfiguration: () => {
      return true;
    },
  };
});

jest.mock("date-fns", () => {
  return {
    compareAsc: jest.fn(),
    parseISO: () => {
      return true;
    },
    sub: () => {
      return true;
    },
    format: jest.fn(),
  };
});

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: async () => jest.fn(),
    setStorageData: async () => jest.fn(),
    removeStorageData: async () => jest.fn(),
  };
});

defineFeature(feature, (test) => {
  let accessToken: string;
  let getAccessToken: any;
  const token = "TOKEN";
  beforeAll(async () => {
    accessToken = await AuthManagers.getAccessTokenAsync();
    getAccessToken = jest
      .spyOn(AuthManagers, "getAccessTokenAsync")
      .mockImplementationOnce(() => Promise.resolve(token));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("User signs in successfully", ({ given, when, then }) => {
    given("the user is not signed in", async () => {
      await AuthManagers.signOutAsync();
    });

    when("the user signs in", async () => {
      await AuthManagers.signInAsync();
      accessToken = await AuthManagers.getAccessTokenAsync();
    });

    then("the user should have a valid access token", () => {
      expect(getAccessToken).toHaveBeenCalled();
      expect(accessToken).toBe(token);
    });
  });
});
