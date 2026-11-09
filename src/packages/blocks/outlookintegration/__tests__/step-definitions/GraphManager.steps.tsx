import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";
import { GraphManagers } from "../../src/graph/GraphManagers";
import { GraphAuthProviders } from "../../src/graph/GraphAuthProviders";
import { GraphAuthProvidersWeb } from "../../src/graph/GraphAuthProvidersWeb";

jest.useFakeTimers();

const feature = loadFeature(
  "./__tests__/features/GraphManager-scenario.feature"
);

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    setItem: () => {
      return true;
    },
    removeItem: () => {
      return true;
    },
    getItem: () => {
      return "token";
    },
  };
});

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "web", // or "ios"
  select: () => null,
}));

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
    compareAsc: jest.fn().mockReturnValue(false),
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
    getStorageData: async () => Promise.resolve("data"),
    setStorageData: async () => jest.fn(),
    removeStorageData: async () => jest.fn(),
  };
});
const response = { value: [] };

jest.mock("@microsoft/microsoft-graph-client", () => {
  const original = jest.requireActual("@microsoft/microsoft-graph-client"); // Step 2.
  return {
    ...original,
    Client: {
      initWithMiddleware: () => ({
        api: jest.fn(() => ({
          top: jest.fn(() => ({
            get: jest.fn().mockResolvedValue(response),
          })),
          select: jest.fn(() => ({
            orderby: jest.fn(() => ({
              top: jest.fn(() => ({
                get: jest.fn().mockResolvedValue(response),
              })),
            })),
          })),
        })),
      }),
    },
  };
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("User integrate with MS Graph API", ({ given, when, then }) => {
    let msEmailAPi: Object;
    let msEventApi: Object;
    let msContactAPi: Object;
    given("I am a integrate MS Graph API", async () => {
      const authProviderWeb = new GraphAuthProvidersWeb({});
      const authProviderMobile = new GraphAuthProviders({});
      await authProviderWeb.getAccessToken();
      await authProviderMobile.getAccessToken();
    });

    when("I get events", async () => {
      msEventApi = await GraphManagers.getEvents();
    });

    then("I receive events data", async () => {
      expect(msEventApi).toEqual(
        expect.objectContaining({
          value: expect.arrayContaining([]),
        })
      );
    });

    when("I get emails", async () => {
      msEmailAPi = await GraphManagers.getEmails();
    });

    then("I receive emails data", async () => {
      expect(msEmailAPi).toEqual(
        expect.objectContaining({
          value: expect.arrayContaining([]),
        })
      );
    });

    when("I get contacts", async () => {
      msContactAPi = await GraphManagers.getContacts();
    });

    then("I receive contacts data", async () => {
      expect(msContactAPi).toEqual(
        expect.objectContaining({
          value: expect.arrayContaining([]),
        })
      );
    });

    when("I am on web platform", async () => {
      jest.spyOn(helpers, "getOS").mockReturnValue("web");
    });

    then("should use GraphAuthProviderWeb for web", async () => {
      const clientOptions = {
        authProvider:
          helpers.getOS() === "web"
            ? new GraphAuthProvidersWeb({})
            : new GraphAuthProviders({}),
      };
      expect(clientOptions.authProvider).toBeInstanceOf(GraphAuthProvidersWeb);
    });
    when("I am on mobile platform", async () => {
      jest.spyOn(helpers, "getOS").mockReturnValue("IOS");
    });
    then("should use GraphAuthProvider for mobile", async () => {
      const clientOptions = {
        authProvider:
          helpers.getOS() === "web"
            ? new GraphAuthProvidersWeb({})
            : new GraphAuthProviders({}),
      };
      expect(clientOptions.authProvider).toBeInstanceOf(GraphAuthProviders);
    });
  });
});
