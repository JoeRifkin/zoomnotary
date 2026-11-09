import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, mount, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OutlookData from "../../src/OutlookData.web";

jest.useFakeTimers();

const screenProps = {
  navigation:{},
  id: "OutlookData",
  msalContext: {},
};

const feature = loadFeature(
  "./__tests__/features/OutlookData-scenario.web.feature"
);

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
jest.mock("@azure/msal-react", () => ({
  MsalContext: {
    Consumer: jest.fn(),
    Provider: jest.fn(),
  },
}));
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    localStorage.setItem("authMsGraphToken", "test token");
  });

  test("User navigates to OutlookData", ({ given, when, then, and }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OutlookData;

    given("I am a User who wants to load OutlookData", () => {
      exampleBlockA = shallow(<OutlookData {...screenProps} />);
    });

    when("I navigate to the OutlookData page", () => {
      instance = exampleBlockA.instance() as OutlookData;
      instance.setState({
        emails,
        calendars,
        contacts,
        isShownMenu: true,
      });
    });

    then("I should be able to see the email list", () => {
      let emailList = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "TestRenderEmails"
      );
      expect(emailList).toHaveLength(1);
    });

    and("I should be able to open an email", () => {
      let emailList = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "TestRenderEmails"
      );
      const openOutLook = jest.fn();
      let testIDClickBtn = emailList.find({ "data-test-id": "testIDClickBtn" });
      window.open = openOutLook;
      testIDClickBtn.simulate("click");
      expect(openOutLook).toHaveBeenCalledTimes(1);
    });
  });
});
