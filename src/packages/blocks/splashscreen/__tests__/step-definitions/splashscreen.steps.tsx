import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Splashscreen from "../../src/Splashscreen";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Splashscreen",
};

const feature = loadFeature("./__tests__/features/splashscreen-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.useFakeTimers();
  });

  test("User navigates to Splashscreen", ({ given, when, then }) => {
    let splashscreen: ShallowWrapper;
    let instance: Splashscreen;

    given("I am a User loading Splashscreen", () => {
      splashscreen = shallow(<Splashscreen {...screenProps} />);
    });

    when("I navigate to the Splashscreen", () => {
      instance = splashscreen.instance() as Splashscreen;
    });

    then("Splashscreen will load with out errors", () => {
      instance.setState({ token: "sdjgfsfgjsdf" })
      instance.gettoken()
      jest.runAllTimers();
      instance.goToLogin()
      expect(Splashscreen).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(Splashscreen).toBeTruthy();
    });
  });

  test('Continue as guest button is pressed', ({ when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Splashscreen;
    let mockSend: any;
    when('the "Continue as Guest" button is pressed', () => {
      dashboardWrapper = shallow(<Splashscreen {...screenProps} />);
      instance = dashboardWrapper.instance() as Splashscreen;
      mockSend = jest.fn();
      instance.send = mockSend;

    });
    then('a navigation message to the guest dashboard should be sent', () => {
      instance.continueAsBtnProps.onPress();
    });

    then('the navigation props should be added to the message', () => {
      const msg = mockSend.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationContinueAsGuestDashboardMessage));

    });
  });
});
