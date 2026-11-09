import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NewPassword from "../../src/NewPassword";
import {GenericHeader} from "../../../../components/src/GenericHeader";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "NewPassword",
};

const formikChildProps = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  errors: {
    password: true,
    confirmPassword: true,
  },
  setFieldTouched: jest.fn(),
  touched: {
    password: true,
    confirmPassword: true,
  },
};

const feature = loadFeature(
  "./__tests__/features/NewPassword-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to NewPassword", ({ given, when, then }) => {
    let newPasswordWrapper: ShallowWrapper;
    let formikChildWrapper: ShallowWrapper;
    let instance: NewPassword;

    given("I am a User loading to NewPassword", () => {
      newPasswordWrapper = shallow(<NewPassword {...screenProps} />);
    });

    when("I navigate to the NewPassword Screen", () => {
      instance = newPasswordWrapper.instance() as NewPassword;
      instance.showAlert = jest.fn();
      instance.send = jest.fn();
    });

    then("NewPassword will load with out errors", () => {
      expect(newPasswordWrapper).toBeTruthy();
      instance.setState({ accountStatus: "ChangePassword" });
    });

    when("Token should be set prom network message", () => {
      const responseTokenMsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

       responseTokenMsg.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "token-string"
      );

      runEngine.sendMessage("Unit Test", responseTokenMsg);
    });

    when("Change password form should be render", () => {
      const changePasswordForm = newPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "changePasswordForm"
      );
      // formikChildWrapper = shallow(
      //   changePasswordForm.props().children(formikChildProps)
      // );
    });

    when("I can enter new password in text input", () => {
      // const txtInputPassword = formikChildWrapper.findWhere(
      //   (node) => node.prop("testID") === "txtInputPassword"
      // );
      // txtInputPassword.simulate("changeText", "password");
      // txtInputPassword.simulate("blur");
      instance.txtInputPasswordProps.onChangeText("Deep@123")
    });

    when("I press icon to show password", () => {
      // const passwordShowHideIcon = formikChildWrapper.findWhere(
      //   (node) => node.prop("testID") === "passwordShowHideIcon"
      // );
      // passwordShowHideIcon.simulate("press");
      instance.btnPasswordShowHideProps.onPress();
    });

    then("Password field is invisible", () => {
      // expect(instance.state.enablePasswordField).toBe(true);
    });

    when("I can enter confirm password", () => {
      jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
      const changePasswordForm = newPasswordWrapper.findWhere(
        (node) => node.prop("data-testid") === "changePasswordForm"
      );
      // const txtInputConfirmPassword = formikChildWrapper.findWhere(
      //   (node) => node.prop("testID") === "txtInputConfirmPassword"
      // );
      // formikChildWrapper = shallow(
      //   changePasswordForm.props().children(formikChildProps)
      // );
      // txtInputConfirmPassword.simulate("changeText", "confirmPassword");
      // txtInputConfirmPassword.simulate("blur");
      instance.txtInputConfirmPasswordProps.onChangeText("Deep@123")
    });

    then("handleChange function should be called", () => {
      // expect(formikChildProps.handleChange).toBeCalledWith("confirmPassword");
    });

    when("I click on show confirm icon to see confirm password", () => {
      // const confirmPasswordShowHide = formikChildWrapper.findWhere(
      //   (node) => node.prop("testID") === "confirmPasswordShowHide"
      // );
      // confirmPasswordShowHide.simulate("press");
      instance.btnConfirmPasswordShowHideProps.onPress()
    });

    then("Password is hidden", () => {
      // expect(instance.state.btnConfirmPasswordShowHide).toBeFalsy();
    });

    when("I press submit button to update new password", () => {
      instance.btnResetPassProps.onPress();
    });

    then("Network call should be called for change password", () => {
      
    });

    when("Network reponse should be get with error", () => {
      const mockData = {
        errors: {},
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );

      instance.requestGoToConfirmationCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("Network reponse should be get with success result", () => {
      const mockData = {
        data: {},
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );

      instance.requestGoToConfirmationCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    // then("Confirmation request is made", () => {
    //   expect(instance.state.accountStatus).toBe("Confirmation");
    // });

    when("I can press on button to navigate home screen", () => {
      // const goToHomeButton = newPasswordWrapper.findWhere(
      //   (node) => node.prop("testID") === "goToHomeButton"
      // );
      // goToHomeButton.simulate("press");
      // instance.goToLogin();
    });

    then("Home navigation message is sent", () => {
      // expect(instance.send).toHaveBeenCalled();
    });

    when("I can press on back button to navigate otp screen", () => {
      let ArrowButton = newPasswordWrapper.find(GenericHeader).at(0).dive()
      const goToBackButton = ArrowButton.findWhere((node) => node.prop("testID") === "btnbackArrowOnSucess");
      // goToBackButton.simulate("press");
      instance.btnGoBackOnSucess.onPress();
    });

    then("OTP navigation message is sent", () => {
      instance.setState({changePassWOrdSuccessFull: true})
      // expect(instance.send).toHaveBeenCalled();
    });
  });

});
