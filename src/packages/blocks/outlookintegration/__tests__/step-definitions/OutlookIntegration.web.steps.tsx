import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, mount, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OutlookIntegration from "../../src/OutlookIntegration.web";

jest.useFakeTimers();

const screenProps = {
  navigation: {},
  id: "OutlookIntegration",
  msalContext: {},
};

const feature = loadFeature(
  "./__tests__/features/OutlookIntegration-scenario.web.feature"
);
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to OutlookIntegration", ({ given, when, then, and }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: OutlookIntegration;

    given("I am a User loading OutlookIntegration", () => {
      exampleBlockA = shallow(<OutlookIntegration {...screenProps} />);
    });

    when("I navigate to the OutlookIntegration", () => {
      instance = exampleBlockA.instance() as OutlookIntegration;
    });

    then("I can click signup button", () => {
      const handleClickSpy = jest.spyOn(instance, "handleLogin");
      instance.setState({ isShownMenu: true });
      instance.forceUpdate();
      let signinBtn = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "TestSignInButton"
      );
      signinBtn.simulate("click");
      expect(handleClickSpy).toHaveBeenCalled();
    });
  });
});
