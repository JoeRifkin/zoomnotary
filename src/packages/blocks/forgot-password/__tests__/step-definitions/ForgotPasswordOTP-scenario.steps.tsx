import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";

import React from "react";
import ForgotPasswordOTP from "../../src/ForgotPasswordOTP";

jest.mock("../../../otp-input-confirmation/src/OTPInputAuthController", () => {
  return class MockOTPInputAuthController extends React.Component {
    state = {
      labelInfo: "",
    };
    submitOtp = jest.fn();
    hideKeyboard = jest.fn();
  };
});

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "ForgotPasswordOTP",
};

const feature = loadFeature(
  "./__tests__/features/ForgotPasswordOTP-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
  });
  afterEach(() => {
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "web",
      select: jest.fn(),
    }));
  });

  test("User navigates to ForgotPasswordOTP", ({ given, when, then }) => {
    let forgotPasswordOTP: ShallowWrapper;
    let instance: ForgotPasswordOTP;

    given("I am a User loading to ForgotPasswordOTP", () => {
      forgotPasswordOTP = shallow(<ForgotPasswordOTP {...screenProps} />);
    });

    when("I navigate to the ForgotPasswordOTP Screen", () => {
      instance = forgotPasswordOTP.instance() as ForgotPasswordOTP;
      instance.showAlert = jest.fn();
    });

    then("ForgotPasswordOTP will load with out errors", () => {
      expect(forgotPasswordOTP).toBeTruthy();
    });

    when("I can enter otp in otp text input", () => {
      const txtMobilePhoneOTP = forgotPasswordOTP.findWhere(
        (node) => node.prop("testID") === "txtMobilePhoneOTP"
      );
      txtMobilePhoneOTP.simulate("changeText", "1234");
    });

    then("Otp text input value should be set", () => {
      expect(instance.state.otp).toBe("1234");
    });

    when("I am clicking anywhere to hide keyboard", () => {
      const hideKeyboard = forgotPasswordOTP.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      hideKeyboard.simulate("press");
    });

    then("Hide keyboard is called", () => {
      expect(instance.hideKeyboard).toBeCalled();
    });

    when("I can press submit button to submit otp", () => {
      const btnSubmitOTP = forgotPasswordOTP.findWhere(
        (node) => node.prop("testID") === "btnSubmitOTP"
      );
      btnSubmitOTP.simulate("press");
    });

    then("Otp auth token should be set", () => {
      expect(instance.submitOtp).toBeCalled();
    });
  });

  test("User navigates to ForgotPasswordOTP in web", ({
    given,
    when,
    then,
  }) => {
    let forgotPasswordOTP: ShallowWrapper;
    let instance: ForgotPasswordOTP;

    given("I am a User loading to ForgotPasswordOTP", () => {
      forgotPasswordOTP = shallow(<ForgotPasswordOTP {...screenProps} />);
    });

    when("I navigate to the ForgotPasswordOTP Screen", () => {
      instance = forgotPasswordOTP.instance() as ForgotPasswordOTP;
      instance.showAlert = jest.fn();
    });

    then("ForgotPasswordOTP will load with out errors", () => {
      expect(forgotPasswordOTP).toBeTruthy();
    });
  });
});
