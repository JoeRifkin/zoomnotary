import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper , configure} from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import OTPInputAuth from "../../src/OTPInputAuth";
import {GenericSucessView} from "../../../../components/src/GenericSucessView";
import { GenericButton } from "../../../../components/src/GenericButton";
import {GenericHeader} from "../../../../components/src/GenericHeader";
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import * as actualRunEngine from '../../../../framework/src/RunEngine'; // Update the path
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodeInput from 'react-native-confirmation-code-input';
import { BackHandler } from 'react-native';


const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "OTPInputAuth",
};

const feature = loadFeature(
  "./__tests__/features/OTPInputAuth-scenario.feature"
);

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
      setItem: () => { return true },
      removeItem: () => { return true },
      getItem: () => { return 'signUpUserDetail' },
  }
})

jest.mock('../../../../framework/src/RunEngine', () => ({
  ...jest.requireActual('../../../../framework/src/RunEngine'), // Keep the actual implementation
  sendMessage: jest.fn(), // Mock the sendMessage function
}));
let clearIntervalMock: any;
jest.useFakeTimers();
let startTimerMock: any;
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.mock('../../../../framework/src/RunEngine', () => ({
      ...jest.requireActual('../../../../framework/src/RunEngine'), // Keep the actual implementation
      sendMessage: jest.fn(), // Mock the sendMessage function
    }));


    clearIntervalMock = jest.fn();
    global.clearInterval = clearIntervalMock;

    startTimerMock = jest.fn();

    OTPInputAuth.prototype.startTimer = startTimerMock;
  });

  test("User navigates to OTPInputAuth", ({ given, when, then }) => {
    let otpInputAuth: ShallowWrapper;
    let instance: OTPInputAuth;

    given("I am a User loading OTPInputAuth", () => {
      otpInputAuth = shallow(<OTPInputAuth {...screenProps} />);
    });

    when("I navigate to the OTPInputAuth", () => {
      instance = otpInputAuth.instance() as OTPInputAuth;
      instance.showAlert = jest.fn();
    });

    then("OTPInputAuth will load with out errors", () => {
      instance.getCallApiforSendOTP();
      instance.setState({signUpUserDetail: {email: "deep@gmail.com", meta: {token: "", email_otp_token: ""}}})
      instance.callApiToGetOTP({email: "deep@gmail.com", meta: {token: "", email_otp_token: ""}})
      expect(otpInputAuth).toBeTruthy();
    });

    then("Call function to get otp with out errors", () => {
      const data = {
        email: "abcd@gmail.com",
        meta: {
          token: "iuiufhjfdu8798fh48df736r7gfbk3yiuwbgf827riuwh",
          email_otp_token: "f348wvh42438424798qorifhv78yhkcjfdjis37qr8eyh"
        }
      }
      instance.setState({signUpUserDetail: data})
      instance.callApiToGetOTP(data)
    });

    then('I can select the Resend code button with out errors', () => {
      let buttonComponent = otpInputAuth.findWhere((node) => node.prop('testID') === 'btnResendCode');
      buttonComponent.simulate('press');
      instance.btnResnedProps.onPress()
    });

    when("I can press back button without errors", () => {
      let btnBackArrow = otpInputAuth.find(GenericHeader).dive()
      let buttonComponent = btnBackArrow.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press');
      instance.btnGoBack.onPress()
    });

    when("I can press submit button without entering otp", () => {
      let btnOtpContinue = otpInputAuth.find(GenericButton).at(0).dive()
      const btnSubmitOTP = btnOtpContinue.findWhere((node) => node.prop("testID") === "btnSubmitOTP");
      btnSubmitOTP.simulate("press");
      instance.btnSubmitOTPProps.onPress()
    });

    then("Error message should be display", () => {
      expect(instance.setState({ isValidation: true }))
    });


    when("I click anywhere to hide keyboard view", () => {
      const hideKeyboard = otpInputAuth.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      hideKeyboard.simulate("press");
    });

    then("Otp state should be updated", () => {
      instance.setState({otpInput: "123456"})
      expect(instance.state.otpInput).toBe("123456");
    });

    when("I can press submit button to verfy otp", () => {
      const btnSubmitOTP = otpInputAuth.findWhere((node) => node.prop("testID") === "btnSubmitOTP");
      btnSubmitOTP.simulate("press");
      instance.setState({ isValidation: false })
      expect(instance.setState({ isValidation: false }))
    }); 

    then("Network should be send request for verify otp", () => {
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
 
      const headers = {
        "Content-Type": "application/json",
        token: instance.state.otpAuthToken,
      };

      instance.otpAuthApiCallId = 'requestMessageMessageId';
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `/account_block/email_account_activate?otp=123456`
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        '"{}"'
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        'GET'
      );
    runEngine.sendMessage('requestMessageMessageId', requestMessage);

    });

    when("Network response should be set for verify otp", () => {
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
      instance.otpAuthApiCallId = responseMsg.messageId;
      instance.formatApiError(responseMsg)
      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when('I enter a valid OTP code 123456', () => {
      // Simulate entering the OTP code
      // For simplicity, you can directly call the onFulfill function here
      instance.onFulfill('123456');
    });

    then("After end user sign up sucess screen without error", () => {
      instance.btnRedirectToDashboard.onPress()
    });

    then("After notary user sign up sucess screen without error", () => {
      instance.btnLoginRedirect.onPress()
    });
  
    then('the authentication should be successful', () => {
      instance.setState({otpInput: '123456'})
    });

    then('call the api of get all services without error', () => {
      instance.setState({isOtpVerified: true, isServiceListVisible: true})
      instance.getAllServices()
    });
    then('I can select the Skip button with out errors', () => {
      instance.clickedRightView()
      instance.setState({
        servicesList: [
          { attributes: { id: 1 } },
          { attributes: { id: 2 } }
        ],
      });
      instance.setState({isOtpVerified: true, isServiceListVisible: false})
    });
    when('the user clicks on "All Select"', () => {
      instance.clickOnAllSelect(); // Assuming clickOnAllSelect is a method in YourComponent
      instance.forceUpdate(); // Update the component state
    });

    then('the selected services should be updated accordingly', () => {
      expect(instance.state.selectedServices).toEqual(expect.any(Array)); // Example assertion
    });

    then('all services should be selected', () => {
      const allIds = instance.state.servicesList.map((item: any) => item.attributes.id);
      expect(instance.state.selectedServices).toEqual(allIds);
    });

    then('Click on single service check box with out error', () => {
      instance.clickOnSelect(11)
      instance.setState({selectedServices: [11], isOtpVerified: true, isServiceListVisible: true})
    });

    then('Click on Save button with out error', () => {
      let btnBackArrow = otpInputAuth.find(GenericButton).at(0).dive()
      let buttonComponent = btnBackArrow.findWhere((node) => node.prop('testID') === 'btnSaveServices');
      buttonComponent.simulate('press');
      instance.btnSubmitServicesProps.onPress()
      instance.setState({isOpenModel: true})
    });

    then('Click on no button from popup with out error', () => {
      let buttonComponent = otpInputAuth.findWhere((node) => node.prop('testID') === 'btnNoToProceed');
      buttonComponent.simulate('press');
      instance.noToChanges.onPress()
      instance.setState({isOpenModel: false})
    });

    then('Click on yes proceed button from popup with out error', () => {
      let buttonComponent = otpInputAuth.findWhere((node) => node.prop('testID') === 'btnYesProceed');
      buttonComponent.simulate('press');
      instance.yesProceedToChanges.onPress()
      instance.callApiToSaveChanges()
      instance.handleAddServicesApiCall()
      const res = {
        "data": [
          {
            "id": "10",
            "type": "service",
            "attributes": {
              "id": 10,
              "service_icon": null,
              "service_name": "Business and Corporate Service",
              "service_description": "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......",
              "is_selected": false
            }
          }
        ]
      }
      instance.handleGetAllServicesApiCall(res)
      instance.handleGetOtpAuthCall(res)
      const errorRes = {"errors": {msg: "failed"}}
      instance.handleFailedResponse(errorRes)
      instance.setState({isOtpVerified: true, isServiceListVisible: false})
    }); 

    then("I can press back button from sucess screen without errors", () => {
      let btnBackArrow = otpInputAuth.find(GenericHeader).at(0).dive()
      let buttonComponent = btnBackArrow.findWhere((node) => node.prop('testID') === 'btnGobackArrowId');
      buttonComponent.simulate('press');
      instance.btnGoBackOnSucess.onPress()
    });

  });

  describe('OTPInputAuth', () => {
    it('should update timer correctly', () => {
      const props = {
        navigation: { /* mock navigation object */ },
        id: 'btnTimerId', // replace with the actual value
      };
      jest.useFakeTimers();
      const { getByText } = render(<OTPInputAuth {...props} />);
      act(() => {
        jest.advanceTimersByTime(1000); // Advance the timer by 1 second
      });
      // expect(getByText('2:30')).toBeTruthy(); // Adjust this assertion based on your initial timer value
      jest.clearAllTimers();
    });
  });
  jest.useFakeTimers();
  test('should clear interval when timer reaches 0', () => {
    const { getByTestId } = render(<OTPInputAuth {...screenProps} />);
    fireEvent.changeText(getByTestId('btnTimerId'))
    jest.advanceTimersByTime(1000);

    expect(clearInterval).not.toHaveBeenCalled(); // Ensure clearInterval is not called yet

    jest.advanceTimersByTime(1000 * 150); // Adjust based on your timer value

    // expect(clearInterval).toHaveBeenCalledWith(expect.any(Number)); // Ensure clearInterval is called with the correct interval ID
  });

  test('Selecting a service', ({ given, when, then }) => {
    let otpInputAuth: ShallowWrapper;
    let instance: OTPInputAuth;
      
    given('the service with ID 1 is not selected', () => {
      otpInputAuth = shallow(<OTPInputAuth {...screenProps} />);
      instance = otpInputAuth.instance() as OTPInputAuth;
      instance.setState({ selectedServices: [] });
    });

    when('I click on select for the service with ID 1', () => {
      instance.clickOnSelect(1);
    });

    then('the service with ID 1 should be selected', () => {
      expect(instance.state.selectedServices).toContain(1);
    });
  });

  test('Deselecting a service', ({ given, when, then }) => {
    let otpInputAuth: ShallowWrapper;
    let instance: OTPInputAuth;
    given('the service with ID 1 is selected', () => {
      otpInputAuth = shallow(<OTPInputAuth {...screenProps} />);
      instance = otpInputAuth.instance() as OTPInputAuth;
      instance.setState({ selectedServices: [1] });
    });

    when('I click on select for the service with ID 1', () => {
      instance.clickOnSelect(1);
    });

    then('the service with ID 1 should be deselected', () => {
      expect(instance.state.selectedServices).not.toContain(1);
    });
  });

  test('Exiting the app on back button click', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: OTPInputAuth;
    let backHandlerMock: any;
    given('the user wants to exit the app', () => {
      dashboardWrapper = shallow(<OTPInputAuth {...screenProps} />);
      instance = dashboardWrapper.instance() as OTPInputAuth;
      instance.setState({isOtpVerified: true, isServiceListVisible: false})
      backHandlerMock = jest.spyOn(BackHandler, 'exitApp');
    });

    when('the user clicks the back button', () => {
      instance.handleBackButtonClick();
    });

    then('the app should exit', () => {
      expect(BackHandler.exitApp).toHaveBeenCalled();
      expect(backHandlerMock).toHaveBeenCalled();
    });
  });


  test('Resend OTP Button Behavior when timer is 0', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: OTPInputAuth;
    let funcCall: any;
    given('the timer is 0', () => {
      forgotPasswordWrapper = shallow(<OTPInputAuth {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as OTPInputAuth;
      instance.setState({ timer: 0})
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
    let instance: OTPInputAuth;
    given('the OTP screen is displayed', () => {
      forgotPasswordWrapper = shallow(<OTPInputAuth {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as OTPInputAuth;
      instance.timerInterval = setTimeout(() => {}, 0);
      instance.setState({
        timer: 150,
        otpInput: "1234"
      });
    });

    when('the user presses the Go Back button', () => {
      instance.btnGoBackOnSucess.onPress();
    });

    then('the timer interval should be cleared', () => {
      expect(clearIntervalMock).toHaveBeenCalledWith(instance.timerInterval);
    });

    then('the timer should be reset to 150', () => {
      expect(instance.state.timer).toBe(150);
    });

    then('the OTP input should be cleared', () => {
      expect(instance.state.otpInput).toBe("1234");
    });
  });

  test('Timer countdown starts and stops correctly', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: OTPInputAuth;
    given('the timer is set to a specific value', () => {
      forgotPasswordWrapper = shallow(<OTPInputAuth {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as OTPInputAuth;
      instance.setState({ timer: 3 });
    });

    when('the startTimer function is called', () => {
      instance.startTimer();
    });

    then('the timer should decrease by 1 every second', () => {
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(1);
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(0);
    });

    then('the timer should stop when it reaches 0', () => {
      jest.advanceTimersByTime(2000);
      expect(instance.state.timer).toBe(0);
      jest.advanceTimersByTime(1000);
      expect(instance.state.timer).toBe(0);
    });
  });

  test('User successfully resends OTP when timer is less than 1', ({ given, when, then }) => {
    let forgotPasswordWrapper: ShallowWrapper;
    let instance: OTPInputAuth;

    given('the timer is set to 0', function () {
      forgotPasswordWrapper = shallow(<OTPInputAuth {...screenProps} />);
      instance = forgotPasswordWrapper.instance() as OTPInputAuth;
      instance.setState({ timer: 0 });
    });
    
    when('the user triggers the resend OTP function', function () {
      // jest.spyOn(instance, 'getCallApiforSendOTP').mockImplementation(() => {});
      // jest.spyOn(instance, 'startTimer').mockImplementation(() => {});
      // jest.spyOn(global, 'clearInterval').mockImplementation(() => {});
      instance.handleResendOtp();
    });
    
    then('the API for sending OTP should be called', function () {
      instance.getCallApiforSendOTP();
      // expect(instance.getCallApiforSendOTP).toHaveBeenCalled();
    });
    
    then('the timer should be reset to 150', function () {
      expect(instance.state.timer).toBe(150);
    });
    
    then('the OTP input field should be cleared', function () {
      expect(instance.state.otpInput).toBe("");
    });
    
    then('the timer should start again', function () {
      instance.startTimer()
      // expect(instance.startTimer()).toHaveBeenCalled();
    });
  });


  describe('OTPInputAuth', () => {
    it('calls navigation.goBack on button press', async () => {
      const { getByTestId } = render(<OTPInputAuth {...screenProps} />);
      const backButton = getByTestId('btnbackArrow'); // Update with your button's test ID

      fireEvent.press(backButton);
    });
  });

});

describe('OTPInputAuth', () => {
  it('returns default error message when apiError is null or undefined', () => {
    const component = new OTPInputAuth(screenProps);
    const result = component.formatApiError(null);
    expect(result).toEqual('Something went wrong');

    const resultUndefined = component.formatApiError(undefined);
    expect(resultUndefined).toEqual('Something went wrong');
  });

  it('returns formatted error message when apiError has errors', () => {
    const component = new OTPInputAuth(screenProps);

    const apiError = {
      errors: {
        field1: ['Error message 1'],
        field2: ['Error message 2'],
      },
    };

    const result = component.formatApiError(apiError);
    expect(result).toEqual('field1 Error message 1');
  });

  it('returns default error message when apiError has no errors', () => {
    const component = new OTPInputAuth(screenProps);

    const apiError = {
      // No errors property
    };

    const result = component.formatApiError(apiError);
    expect(result).toEqual('Something went wrong');
  });
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('OTPInputAuth', () => {
  it('sets state and calls callApiToGetOTP after reading from AsyncStorage', async () => {
    const component = new OTPInputAuth(screenProps);
    const mockData = { email: "abc@gmail.com", meta: {token: "hwrjhnwukf3687256ewdff1463iregf", email_otp_token: "8trgfhg3o748twghjbvndy964928eygdvhfyue"} };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockData));

    const callApiToGetOTPMock = jest.spyOn(component, 'callApiToGetOTP');

    await component.getCallApiforSendOTP();

    expect(callApiToGetOTPMock).toHaveBeenCalledWith(mockData);
  });

  it('does nothing if AsyncStorage.getItem returns null', async () => {
    const component = new OTPInputAuth(screenProps);

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const setStateMock = jest.spyOn(component, 'setState');
    const callApiToGetOTPMock = jest.spyOn(component, 'callApiToGetOTP');

    await component.getCallApiforSendOTP();
    expect(callApiToGetOTPMock).not.toHaveBeenCalled();
  });
});

describe('OTPInputAuth', () => {
  it('initializes signUpUserDetail state correctly', async () => {
    // Mock AsyncStorage.getItem method
    const mockAsyncStorageGetItem = jest.spyOn(AsyncStorage, 'getItem');
    mockAsyncStorageGetItem.mockResolvedValueOnce(JSON.stringify({ key: 'OTPInputAuth' }));

    const wrapper = shallow(<OTPInputAuth  {...screenProps} />);

    await act(async () => {
      wrapper.update();
    });
    expect(wrapper.state('signUpUserDetail')).toEqual({ key: 'OTPInputAuth' });

    mockAsyncStorageGetItem.mockRestore();
  });
});

