import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GooglePayIntegration from "../../src/GooglePayIntegration.web";

const screenProps = {
  navigation: {},
  id: "GooglePayIntegration",
};

const feature = loadFeature(
  "./__tests__/features/GooglePayIntegration-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    
  });

  test("User navigates to GooglePayIntegration", ({ given, when, then }) => {
    let googlePayIntegration: ShallowWrapper;
    let instance: GooglePayIntegration;

    given("I am a User loading GooglePayIntegration", () => {
      googlePayIntegration = shallow(<GooglePayIntegration {...screenProps} />);
    });
    when("I navigate to the GooglePayIntegration", () => {
      instance = googlePayIntegration.instance() as GooglePayIntegration;
    });
    then("I can enter text with out errors", () => {
      let textInputComponent = googlePayIntegration.findWhere(
        (node) => node.prop("data-test-id") === "txtInput"
      );
      const event = {
        preventDefault() {},
        target: { value: "hello@aol.com" },
      };
      textInputComponent.simulate("change", event);
      expect(textInputComponent.prop("value")).toBe("");
    });
    when("I can select the button with with out errors", () => {
      let buttonComponent = googlePayIntegration.findWhere(
        (node) => node.prop("data-test-id") === "btnAddExample"
      );
      buttonComponent.simulate("press");
    });
  });
});
