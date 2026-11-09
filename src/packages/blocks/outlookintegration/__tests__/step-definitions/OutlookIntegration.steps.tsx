import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OutlookIntegration from "../../src/OutlookIntegration";
import { GraphManagers } from "../../src/graph/GraphManagers";

// require("isomorphic-fetch")
jest.useFakeTimers();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: jest.fn(),
  },
  addListener: jest.fn((event, callback) => {
    if (event === "didFocus") {
      callback();
    }
  }),
  id: "OutlookIntegration",
  msalContext: {},
};

const feature = loadFeature(
  "./__tests__/features/OutlookIntegration-scenario.feature"
);

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "web", // or "ios"
  select: () => null,
}));

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: async () => Promise.resolve("data"),
    setStorageData: async () => jest.fn(),
    removeStorageData: async () => jest.fn(),
  };
});

const emails = [{ id: "id", subject: "string", webLink: "string" }];
const contacts = [{ id: "string", displayName: "string" }];
const calendars = [
  {
    id: "string",
    subject: "string",
    start: { dateTime: "2022-12-14T04:00:00.0000000" },
    end: { dateTime: "2022-12-14T04:00:00.0000000" },
    organizer: {
      emailAddress: { name: "string" },
      start: { dateTime: "2022-12-14T04:00:00.0000000" },
      end: { dateTime: "2022-12-14T04:00:00.0000000" },
    },
  },
];

const mockUser = {
  displayName: "John Doe",
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "IOS" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "IOS");
  });

  test("User interacts with OutlookIntegration", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OutlookIntegration;

    given("I am a User on the OutlookIntegration screen", () => {
      exampleBlockA = shallow(<OutlookIntegration {...screenProps} />);
    });

    when("I navigate to the OutlookIntegration screen", async () => {
      instance = exampleBlockA.instance() as OutlookIntegration;
      jest
        .spyOn(GraphManagers, "getUserAsync")
        .mockImplementation(() => Promise.resolve(mockUser));
      instance.receive("test", {
        id: "1",
        messageId: "51",
        properties: {},
      } as any);
      const message = new Message(getName(MessageEnum.AccoutLoginSuccess));
      message.getData(getName(MessageEnum.AuthTokenDataMessage));
      message.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        message.messageId
      );
      runEngine.sendMessage("Unit Test", message);
    });

    then(
      "the OutlookIntegration screen loads without errors by rendering SignIn button",
      () => {
        let buttonComponent = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "TestSignInButton"
        );
        expect(buttonComponent).toHaveLength(1);
      }
    );

    when(
      "the user is sign in is confirmed and the signup is pressed",
      async () => {
        let buttonComponent = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "TestSignInButton"
        );
        buttonComponent.simulate("press");
      }
    );
    then("I can get the user informations", () => {
      expect(instance.state.displayName).toBe(mockUser.displayName);
    });

    when("the contact button is clicked", async () => {
      jest
        .spyOn(GraphManagers, "getContacts")
        .mockImplementation(() => Promise.resolve({ value: contacts }));
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TestContactButton"
      );
      buttonComponent.simulate("press");
    });
    then("the contact flatlist data should be displayed", () => {
      const flatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "testIDFlatlistContacts"
      );
      flatlist.props().keyExtractor({ id: 0 });
      flatlist.renderProp("renderItem")({ item: contacts[0] });
      expect(flatlist).toHaveLength(1);
    });

    when("the event button is clicked", async () => {
      jest
        .spyOn(GraphManagers, "getEvents")
        .mockImplementation(() => Promise.resolve({ value: calendars }));
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TestEventButton"
      );
      buttonComponent.simulate("press");
    });
    then("the event flatlist data should be displayed", () => {
      const flatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "testIDFlatlistCalendars"
      );
      flatlist.props().keyExtractor({ id: 0 });
      flatlist.renderProp("renderItem")({ item: calendars[0] });
      expect(flatlist).toHaveLength(1);
    });

    when("the email button is clicked", async () => {
      jest
        .spyOn(GraphManagers, "getEmails")
        .mockImplementation(() => Promise.resolve({ value: emails }));
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TestEmailButton"
      );
      buttonComponent.simulate("press");
    });
    then("the email flatlist data should be displayed", () => {
      const flatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "testIDFlatlist"
      );
      flatlist.props().keyExtractor({ id: 0 });
      const renderItem = flatlist.renderProp("renderItem")({ item: emails[0] });
      const openEmailDetail = jest.spyOn(instance, "openEmailDetail");
      renderItem.simulate("press");
      expect(openEmailDetail).toHaveBeenCalled();
      expect(flatlist).toHaveLength(1);
    });

    when("the logout button is clicked", async () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnLogout"
      );
      buttonComponent.simulate("press");
    });
    then("It should remove all data", () => {
      expect(instance.state.contacts).toHaveLength(0);
      expect(instance.state.calendars).toHaveLength(0);
    });
    when("the token has expried", async () => {
      const mockError: any = new Error("Unauthorized");
      mockError.statusCode = 401;
      jest.spyOn(GraphManagers, "getUserAsync").mockRejectedValue(mockError);
    });

    then(
      "The invalidAuthenticationTokenCode should have been called",
      async () => {
        const invalidAuthenticationTokenCode = jest.spyOn(
          instance,
          "invalidAuthenticationTokenCode"
        );
        await instance.getUserInfo();
        expect(invalidAuthenticationTokenCode).toHaveBeenCalled();
      }
    );
  });
});
