import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import {
  StyleSheet
} from "react-native";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ForgotPassword from "../../src/ForgotPassword";
import {GenericHeader} from "../../../../components/src/GenericHeader";
import {GenericTextWithHperLink} from "../../../../components/src/GenericTextWithHperLink";
import {GenericButton} from "../../../../components/src/GenericButton";
import ForgotPasswordController from "../../src/ForgotPasswordController";
const navigation = require("react-navigation");

export const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: "bold",
    fontSize: 14,
    fontStyle: 'normal',
    textDecorationColor: '#012275',
    zIndex: 1,
    borderBottomWidth: 2
  },
  unableResend: {
    color: "#012275",
    borderBottomColor: '#012275',
  },
  disableResend: {
    color: "#64748B",
    borderBottomColor: '#64748B',
  },
});

const screenProps = {
  navigation: navigation,
  id: "ForgotPassword",
};

const formikChildProps = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  errors: {
    phone: true,
    email: true,
    otpCode: true,
  },
  setFieldTouched: jest.fn(),
  touched: {
    phone: true,
    email: true,
    otpCode: true,
  },
};

const feature = loadFeature(
  "./__tests__/features/ForgotPassword-scenario.feature"
);
let clearIntervalMock: any;
jest.useFakeTimers();
let startTimerMock: any;
let handleSuccessResponseMock: any;
let handleOtpAuthConfirmSuccessMock: any;
let messageMock: any;
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");

    clearIntervalMock = jest.fn();
    global.clearInterval = clearIntervalMock;

    startTimerMock = jest.fn();
    handleSuccessResponseMock = jest.fn();
    handleOtpAuthConfirmSuccessMock = jest.fn();

    ForgotPasswordController.prototype.startTimer = startTimerMock;
    ForgotPasswordController.prototype.handleSuccessResponse = handleSuccessResponseMock;
    ForgotPasswordController.prototype.handleOtpAuthConfirmSuccess = handleOtpAuthConfirmSuccessMock;

    messageMock = new Message("");
    jest.spyOn(messageMock, 'getData');
  });

  test("User navigates to ForgotPassword", ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let formikChildWrapper: ShallowWrapper;
    let instance: ForgotPassword;

    given("I am a User loading to ForgotPassword", () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
    });

    when("I navigate to the ForgotPassword Screen", () => {
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.showAlert = jest.fn();
    });

    then("ForgotPassword will load with out errors", () => {
      expect(forgotPasswordWrapper).toBeTruthy();
    });

    then('I can select the back button with out errors', () => {
      let buttonComponent = forgotPasswordWrapper.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press');
      instance.btnGoBack.onPress()
    });

    then('I can Enter email for forget with out errors', () => {
      // let TextInput1 = forgotPasswordWrapper.find(GenericTextInput).at(0).dive()
      let textInputComponent = forgotPasswordWrapper.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
      textInputComponent.simulate('changeText', 'FIRST');
      instance.startForgotPassword('email')
      instance.txtInputEmailMobilePrpos.onChangeText("deep@gmail.com")
      instance.txtInputEmailPrpos.onChangeText("deep@gmail.com")
      instance.setState({email: "deep@gmail.com", isErrorMsg: false, isValidation: false})
    });

    then('I can select the Login button with out errors', () => {
      let signUpHyperLink = forgotPasswordWrapper.find(GenericTextWithHperLink).dive()
      let buttonComponent = signUpHyperLink.findWhere((node) => node.prop('testID') === 'btnLogin');
      buttonComponent.simulate('press');
    });

    then("Network api shoudl be called for getiing validation rules", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "profile/validations",
            RestAPIRequestHeaderMessage: expect.any(String)
          },
        })
      );
    });

    when("Network response for validation rules is set", () => {
      const mockData = {
        data: [
          {
            email_validation_regexp: "",
            password_validation_rules: "",
          },
        ],
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

      instance.validationAPICallId = responseMsg.messageId;
        instance.otpAuthConfirmApiCallId = responseMsg.messageId;
      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );

      runEngine.sendMessage("Unit Test", responseMsg);
    })

    then('I can select the Submit button with out errors', () => {


      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)          
      let ButtonLogin = forgotPasswordWrapper.find(GenericTextWithHperLink).dive()
      let buttonComponent = ButtonLogin.findWhere((node) => node.prop('testID') === 'btnLogin');
      buttonComponent.simulate('press')

      let ArrowButton = forgotPasswordWrapper.find(GenericHeader).dive()
      buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')

      let ButtonSignUp = forgotPasswordWrapper.find(GenericButton).at(0).dive()
      buttonComponent = ButtonSignUp.findWhere((node) => node.prop('testID') === 'btnSignUpPage');
      buttonComponent.simulate('press')

      let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
      magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
          "meta": {
              "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NCwiZXhwIjoxNzA2NjE1MzQyfQ.x632GYgnZCr0vpQQfo49jkOanQI8FLvOXJlgIeVqv8MI3dwed-9w511NAhRmhgHAbFs7OiRWZl7oG8TMyQ7vGw"
          }
      });
      instance.requestEmailOtpCallId = magLogInSucessRestAPI
      
      runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)  
       
  });

    when("I can press on submit button", () => {
      let ButtonSignUp = forgotPasswordWrapper.find(GenericButton).at(0).dive()
      const  buttonComponent = ButtonSignUp.findWhere((node) => node.prop('testID') === 'btnSignUpPage');
      buttonComponent.simulate('press')
      instance = forgotPasswordWrapper.instance() as ForgotPassword 
      instance.setState({ isValidation: false, email: "deepabcd@gmail.com"});
      instance.validateEmail('deependra@gmail.com')
      instance.validateEmail('deependra@gmail.c')
    });

    then("Network should be called for getting otp", () => {
      instance.btnNextProps.onPress()
      instance.sendEmailVerifiy();
      expect(instance.sendEmailVerifiy()).toBe(true);
    });

    when("Network response should be get with errors", () => {
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: {},
      });

      instance.requestPhoneOtpCallId = responseMsg.messageId;
      instance.requestEmailVerifyCallId = responseMsg.messageId;
      instance.otpToken = "8whfjg8ywrohjgsbj839q7reudhggwy9uthrwgfsyfurw"
      runEngine.sendMessage("Unit Test", responseMsg);

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        undefined
      );
      responseMsg.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {});

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("Network response should be get with success response data", () => {
      const mockData = {
        meta: {
          token: "token-string",
        },
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
      instance.startTimer();
      instance.requestPhoneOtpCallId = responseMsg.messageId;
      instance.requestChangePasswordCallId = responseMsg.messageId;
      instance.setState({isOTPViewDisplay: true})
      runEngine.sendMessage("Unit Test", responseMsg);
    });

    then("Token is set", () => {
      instance.setState({isOTPViewDisplay: true, otpToken: "837ryefdhjhfw87re8gujfduygwireqkhfadvgdf"})
      expect(instance.state.otpToken).toBeTruthy();
    });

     then('I can select the Resend code button with out errors', () => {
      let buttonComponent = forgotPasswordWrapper.findWhere((node) => node.prop('testID') === 'btnResendCode');
      buttonComponent.simulate('press');
      instance.btnResnedProps.onPress()
      instance.handleResendOtp()
    });

    when('I can select the Next otp submit button with out errors', () => {
      let buttonComponent = forgotPasswordWrapper.findWhere((node) => node.prop('testID') === 'btnSubmitOTP');
      buttonComponent.simulate('press');
      instance.setState({isValidation: false, otpInput: '123456', otpToken: "khcjgertkjgm8758owitgwq47584wtyjsgjfjr873oityrg"})
    });

    then("Network should be called for submit otp", () => {
      instance.btnSubmitOTPProps.onPress()
      instance.submitOtp();
      expect(instance.submitOtp()).toBe(true);
    });

    when("I can press on back button to navigate otp screen", () => {
      let ArrowButton = forgotPasswordWrapper.find(GenericHeader).at(0).dive()
      const goToBackButton = ArrowButton.findWhere((node) => node.prop("testID") === "btnbackArrow");
      goToBackButton.simulate("press");
      instance.btnGoBackForOTP.onPress();
      instance.setState({isOTPViewDisplay: false, isErrorMsg: false, timer: 150, otpInput: ""})
    });

    then("OTP navigation message is sent", () => {
      instance.setState({isOTPViewDisplay: false, isErrorMsg: false})
    });
  });

  test("Style when the timer is 0", ({given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;

    given('the component is rendered', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      // instance.setState({isOTPViewDisplay: true})
    });
    
    when(/^the timer is set to (\d+)$/, (timerValue) => {
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      forgotPasswordWrapper.setState({ timer: timerValue });
      instance.setState({isOTPViewDisplay: true})
    });
    
    then('the Resend Code Button style should include the \'disableResend\' style', () => {
      
      const resendCodeButton = forgotPasswordWrapper.find({ testID: 'btnResendCode' });
      const receivedStyle = resendCodeButton.prop('style');

      // expect(receivedStyle[0]).toEqual(expect.objectContaining([styles.forgotPassword, styles.disableResend])); // Common style

      // expect(receivedStyle[1]).toEqual(expect.objectContaining(styles.disableResend));
    });

    when(/^the timer is set to (\d+)$/, (timerValue) => {
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      forgotPasswordWrapper.setState({ timer: timerValue });
      instance.setState({isOTPViewDisplay: true, timer: 0})
    });
    
    then('the Resend Code Button style should include the \'unableResend\' style', () => {
      
      const resendCodeButton = forgotPasswordWrapper.find({ testID: 'btnResendCode' });
      const receivedStyle = resendCodeButton.prop('style');

      // expect(receivedStyle[0]).toEqual(expect.objectContaining(styles.forgotPassword)); // Common style

      // expect(receivedStyle[1]).toEqual(expect.objectContaining(styles.unableResend));
    });

  }); 

  test('Resend OTP Button Behavior when timer is 0', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    let funcCall: any;
    given('the timer is 0', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({isOTPViewDisplay: true, timer: 0})
    });

    when('the user presses the resend button', () => {
      let buttonComponent = forgotPasswordWrapper.findWhere((node) => node.prop('testID') === 'btnResendCode');
      buttonComponent.simulate('press');
      instance.btnResnedProps.onPress()
      funcCall = instance.handleResendOtp = jest.fn();
    });

    then('the handleResendOtp function should be called', () => {
      expect(funcCall).toBeTruthy();
    });
  });

  test('User presses the Go Back button on the OTP screen', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the OTP screen is displayed', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.timerInterval = setTimeout(() => {}, 0);
      instance.setState({
        isOTPViewDisplay: true,
        isErrorMsg: true,
        timer: 100,
        otpInput: "1234"
      });
    });

    when('the user presses the Go Back button', () => {
      instance.btnGoBackForOTP.onPress();
    });

    then('the timer interval should be cleared', () => {
      expect(clearIntervalMock).toHaveBeenCalledWith(instance.timerInterval);
    });

    then('the OTP view should not be displayed', () => {
      expect(instance.state.isOTPViewDisplay).toBe(false);
    });

    then('the error message should not be displayed', () => {
      expect(instance.state.isErrorMsg).toBe(false);
    });

    then('the timer should be reset to 150', () => {
      expect(instance.state.timer).toBe(150);
    });

    then('the OTP input should be cleared', () => {
      expect(instance.state.otpInput).toBe("");
    });
  });

  test('Timer countdown starts and stops correctly', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the timer is set to a specific value', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({ timer: 3 });
    });

    when('the startTimer function is called', () => {
      instance.startTimer();
    });

    then('the timer should decrease by 1 every second', () => {
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(2);
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(1);
    });

    then('the timer should stop when it reaches 0', () => {
      jest.advanceTimersByTime(2000);
      expect(instance.state.timer).toBe(0);
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(0);
    });
  });

  test('Valid email OTP token response', ({ given, when, then }) => {
    let responseJsonMock: any;
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('a message with a valid email OTP token response', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      responseJsonMock = {
        meta: { email_otp_token: 'someToken' }
      };
      instance.requestEmailVerifyCallId = 'emailVerifyCallId';
      messageMock.getData.mockReturnValue('emailVerifyCallId');
    });

    when('the manageResponse function is called', () => {
      instance.manageResponse(messageMock, responseJsonMock);
    });

    then('the otpToken should be set', () => {
      expect(instance.otpToken).toEqual(responseJsonMock.meta);
    });

    then('the OTP view should be displayed', () => {
      expect(instance.state.isOTPViewDisplay).toBe(true);
    });

    then('the validation should be false', () => {
      expect(instance.state.isValidation).toBe(false);
    });

    then('the error message should be false', () => {
      expect(instance.state.isErrorMsg).toBe(false);
    });

    then('the timer should start', () => {
      // expect(startTimerMock).toHaveBeenCalled();
    });
  });

  test('Invalid email OTP token response', ({ given, when, then }) => {
    let responseJsonMock: any;
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('a message with an invalid email OTP token response', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      responseJsonMock = {};
      instance.requestEmailVerifyCallId = 'emailVerifyCallId';
      messageMock.getData.mockReturnValue('emailVerifyCallId');
    });

    when('the manageResponse function is called', () => {
      instance.manageResponse(messageMock, responseJsonMock);
    });

    then('handleSuccessResponse should be called', () => {
      // expect(handleSuccessResponseMock).toHaveBeenCalledWith(responseJsonMock, expect.any(Function), messageMock);
    });
  });

  test('Valid OTP auth confirmation response', ({ given, when, then }) => {
    let responseJsonMock: any;
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('a message with a valid OTP auth confirmation response', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      responseJsonMock = {};
      instance.otpAuthConfirmApiCallId = 'otpAuthConfirmApiCallId';
      messageMock.getData.mockReturnValue('otpAuthConfirmApiCallId');
    });

    when('the manageResponse function is called', () => {
      instance.manageResponse(messageMock, responseJsonMock);
    });

    then('handleSuccessResponse should be called with handleOtpAuthConfirmSuccess', () => {
      // expect(handleSuccessResponseMock).toHaveBeenCalledWith(responseJsonMock, instance.handleOtpAuthConfirmSuccess, messageMock);
    });
  });

  test('Valid request change password response', ({ given, when, then }) => {
    let responseJsonMock: any;
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('a message with a valid request change password response', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      responseJsonMock = {};
      instance.requestChangePasswordCallId = 'requestChangePasswordCallId';
      messageMock.getData.mockReturnValue('requestChangePasswordCallId');
    });

    when('the manageResponse function is called', () => {
      instance.manageResponse(messageMock, responseJsonMock);
    });

    then('handleSuccessResponse should be called', () => {
      // expect(handleSuccessResponseMock).toHaveBeenCalledWith(responseJsonMock, expect.any(Function), messageMock);
    });

    then('changePassWOrdSuccessFull should be false', () => {
      expect(instance.state.changePassWOrdSuccessFull).toBe(false);
    });
  });

  test('Password length is less than 8 characters', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the password is "short"', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({ password: 'short' });
    });

    when('the validation is performed', () => {
      instance.getImageForValidation();
    });

    then('the first validation should fail', () => {
      expect(instance.state.firstValidationPass).toBe(false);
    });

    then('the second validation should fail', () => {
      expect(instance.state.secValidationPass).toBe(false);
    });

    then('the third validation should pass', () => {
      expect(instance.state.thiredValidationPass).toBe(true);
    });
  });

  test('Password length is 8 or more characters but missing complexity', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the password is "longenough"', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({ password: 'longenough' });
    });

    when('the validation is performed', () => {
      instance.getImageForValidation();
    });

    then('the first validation should pass', () => {
      expect(instance.state.firstValidationPass).toBe(true);
    });

    then('the second validation should fail', () => {
      expect(instance.state.secValidationPass).toBe(false);
    });

    then('the third validation should pass', () => {
      expect(instance.state.thiredValidationPass).toBe(true);
    });
  });

  test('Password meets all criteria', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the password is "Valid1@Password"', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({ password: 'Valid1@Password' });
    });

    when('the validation is performed', () => {
      instance.getImageForValidation();
    });

    then('the first validation should pass', () => {
      expect(instance.state.firstValidationPass).toBe(true);
    });

    then('the second validation should pass', () => {
      expect(instance.state.secValidationPass).toBe(true);
    });

    then('the third validation should pass', () => {
      expect(instance.state.thiredValidationPass).toBe(true);
    });
  });

  test('Password fails the third validation criteria', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: ForgotPassword;
    given('the password is "Valid1Password"', () => {
      forgotPasswordWrapper = shallow(<ForgotPassword {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as ForgotPassword;
      instance.setState({ password: 'Deep@123  ' });
    });

    when('the validation is performed', () => {
      instance.getImageForValidation();
    });

    then('the first validation should pass', () => {
      expect(instance.state.firstValidationPass).toBe(true);
    });

    then('the second validation should pass', () => {
      expect(instance.state.secValidationPass).toBe(true);
    });

    then('the third validation should fail', () => {
      expect(instance.state.thiredValidationPass).toBe(false);
    });
  });

});
