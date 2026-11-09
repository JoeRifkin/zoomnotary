import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { GenericHeader } from "../../../../components/src/GenericHeader";

import { PermissionsAndroid, Platform } from "react-native";
import InviteClient from "../../src/InviteClient";
export const configJSON = require("../../src/config");

const navigate = jest.fn();

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {

    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn(),
    trim: jest.fn(),
    props: jest.fn(),
    Alert: jest.fn(),
    filter: jest.fn(),
    show: jest.fn,
  },
  goBack: () => jest.fn(),
  id: "InviteClient",
};


const feature = loadFeature(
  "./__tests__/features/InviteClient-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
    jest.spyOn(PermissionsAndroid, "request").mockImplementation(((event: string, data: {}) => {
      return true
    }) as any);
  });

  test("User navigates to InviteClient", ({ given, when, then }) => {
    let inviteClient: ShallowWrapper;
    let instance: InviteClient;
    let addListenerMock: any;
    given("I am a User loading InviteClient", () => {
      inviteClient = shallow(<InviteClient {...screenProps} />);
      Platform.OS = 'android'
      addListenerMock = jest.fn((event, callback) => {
        if (event === "willFocus") {
          callback();
        }
      });
    });

    when("I navigate to the InviteClient", async () => {
      instance = inviteClient.instance() as InviteClient;
      let ArrowButton = inviteClient.find(GenericHeader).at(0).dive()
      const goToBackButton = ArrowButton.findWhere((node) => node.prop("testID") === "btnbackArrowOnSucess");
      instance.btnGoBack.onPress();

    });

    when("User click on launch meeting button", () => {
      instance.renderNameUI()
      instance.renderEmailUI()
      instance.renderMobileUI()
      instance.renderServiceUI()
      instance.renderNotrazisationUI()
      instance.renderFeesUI()
      instance.renderFeesCheckBoxUI()
      instance.renderDateUI()
      instance.renderTimeUI()
      instance.renderCheckBoxUI()
      instance.renderMessageUI()
    });

    then("User enter Input Name invite client", () => {
      const rejectReasonTextInput = inviteClient.findWhere(
        (node) => node.prop("testID") === "InputNameTestID"
      );
      rejectReasonTextInput.simulate("changeText", "reject reason text");
      rejectReasonTextInput.simulate("changeText", " ");

      let buttonComponent = inviteClient.findWhere((node) => node.prop('testID') === 'InviteClientTestId');
      buttonComponent.simulate("press")

    });
    then("User enter Input email invite client", () => {
      const rejectReasonTextInput = inviteClient.findWhere(
        (node) => node.prop("testID") === "InputEmailTestID"
      );
      rejectReasonTextInput.simulate("changeText", "abc@gmail.com");
      rejectReasonTextInput.simulate("changeText", " ");

      let buttonComponent = inviteClient.findWhere((node) => node.prop('testID') === 'InviteClientTestId');
      buttonComponent.simulate("press")
    });
    then("User click to dropDown country code", () => {

      let buttonComponent = inviteClient.findWhere((node) => node.prop('testID') === 'serviceListId');
      buttonComponent.simulate('change', "657")
      buttonComponent.props().renderRightIcon()
      buttonComponent.simulate("Focus")
      buttonComponent.simulate("Blur")

    });
    then("User Enter Phone number", () => {
      const dropDowncode = inviteClient.findWhere(
        (node) => node.prop("testID") === "txtInputPhoneNumber"
      );
      dropDowncode.simulate("changeText", "98545867548");

      dropDowncode.simulate("changeText", " ");

      let buttonComponent = inviteClient.findWhere((node) => node.prop('testID') === 'InviteClientTestId');
      buttonComponent.simulate("press")
    });
    then("User Enter invite client fees", () => {
      
      let buttonComponent = inviteClient.findWhere((node) => node.prop('testID') === 'InviteClientTestId');
      buttonComponent.simulate("press")

    });
    then("User click to check isCheckedFees", () => {
      const dropDowncode1 = inviteClient.findWhere(
        (node) => node.prop("testID") === "firstFeesCheckBoxID"
      );
      dropDowncode1.simulate("press");
    });

  });


  test('Handle dropdown open close and image change', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let messageMock: any
    let addListenerMock: any
    given('I have the function which is open close dropdown', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      addListenerMock = jest.fn((event, callback) => {
        if (event === "willFocus") {
          callback();
        }
      });
      messageMock = {
        id: getName(MessageEnum.SessionResponseMessage),
        getData: jest.fn((key) => {
          if (key === getName(MessageEnum.SessionResponseToken)) {
            return 'mockToken123';
          }
          if (key === getName(MessageEnum.SessionResponseData)) {
            return JSON.stringify({
              meta: {
                id: 'mockAccountId456',
              },
            });
          }
          return null;
        }),
      };

    });

    when('I call the openCloseDropdown function', () => {
      instance.handleSessionResponseMessage(messageMock);
    });


    then('I should see dropdown is open and image changes', () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'serviceListId1');
      buttonComponent.simulate('change', "Notary Service")
      buttonComponent.props().renderRightIcon()
      buttonComponent.simulate("Focus")
      buttonComponent.simulate("Blur")
    });
    then('I should see dropdown is open and methodOfNotarisationID changes', () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'methodOfNotarisationID');
      buttonComponent.simulate('change', "Notary Service")
      buttonComponent.props().renderRightIcon()
      buttonComponent.simulate("Focus")
      buttonComponent.simulate("Blur")
    });
    then("I can Click and date an time field to open calendar model with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'dataAndTimeId');
      buttonComponent.simulate('Focus')
    });
    then("I can select Date From ccalendar with out errors", async () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'calendarSelectDataID');
      buttonComponent.props().onDayPress({ dateString: "2024-10-11" }); 
      buttonComponent.props().onDayPress({ dateString: "2024-10-11" });
      buttonComponent.props().onDayPress({ dateString: "2024-10-12" });
      buttonComponent.props().onDayPress({ dateString: "2024-10-13" });
      instance.markedDatesWithColor()

      buttonComponent.props().onMonthChange({ dateString: "2024-09-13" });
      buttonComponent.props().onMonthChange({ dateString: "2024-10-13" });
      buttonComponent.props().onMonthChange({ dateString: "2024-12-01" });

    });
    then("I can select show picker", async () => {
    });
    then("I can select end time picker", async () => {
    });
    then("I can Enter message note invite client", async () => {
      let ArrowButton = dashboardWrapper.find(GenericHeader).at(0).dive()
      const goToBackButton = ArrowButton.findWhere((node) => node.prop("testID") === "firstCustomCheckBoxID");
      instance.btnFirstCheckBoxProps.onPress();
    });
    then("I can select Yes procced Button from popup with out errors", () => {
      instance.yesProceedToChanges.onPress()
    });
    then("I can select No Button from popup with out errors", () => {
      instance.noToChanges.onPress()
    });
    then("I can enter create invite Client", async () => {
     });

    then("invite client request for create new notary data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.onCreateInviteRequestCallid = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });


    then("invite client Handle applicant create API response", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "countries": [
            {
              "country_code": "1",
              "name": "American Samoa",
              "flag": "<�<�"
            },

            {
              "country_code": "686",
              "name": "Kiribati",
              "flag": "<�<�"
            },

          ]
        }
      );
      instance.getCountryCodeApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });
    then("invite client servcie list response error", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "countries": [
            {
              "country_code": "1",
              "name": "American Samoa",
              "flag": "<�<�"
            },

            {
              "country_code": "686",
              "name": "Kiribati",
              "flag": "<�<�"
            },

          ]
        }
      );
      instance.getAllServicesApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });
    then("invite client getNotrizationMethodApiCallId create API response", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),

        [
          {
            "id": 2,
            "notarisation_method": "Remote Ink Notarisation (RIN)",
            "created_at": "2024-05-08T06:46:56.040Z",
            "updated_at": "2024-05-08T06:47:24.566Z"
          },
          {
            "id": 1,
            "notarisation_method": "Remote Electronic Notarisation (REN)",
            "created_at": "2024-05-08T06:14:28.072Z",
            "updated_at": "2024-05-08T06:47:44.043Z"
          },
        ]
      );
      instance.getNotrizationMethodApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });
  });

  test('Return true when selectedNotarisation is valid and label does not include "RIN"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the selectedNotarisation is valid and its label does not include "RIN"', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        selectedNotarisation: { label: 'Standard Notarisation' },
      });
    });

    when('the showAstrickForVide function is called', () => {
      result = instance.showAstrickForVide();
    });

    then('the function should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Return false when selectedNotarisation is null', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the selectedNotarisation is null', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        selectedNotarisation: null,
      });
    });

    when('the showAstrickForVide function is called', () => {
      result = instance.showAstrickForVide();
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Return false when selectedNotarisation label is missing', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the selectedNotarisation does not have a label', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        selectedNotarisation: {},
      });
    });

    when('the showAstrickForVide function is called', () => {
      result = instance.showAstrickForVide();
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Return false when selectedNotarisation label includes "RIN"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the selectedNotarisation label includes "RIN"', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        selectedNotarisation: { label: 'RIN Notarisation' },
      });
    });

    when('the showAstrickForVide function is called', () => {
      result = instance.showAstrickForVide();
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Start time is less than end time and meets the minimum gap', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('start time is "10:00 AM", end time is "11:30 AM", and the minimum gap is 30 minutes', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
    });

    when('the isStartTimeLessThanEndTime function is called', () => {
      result = instance.isStartTimeLessThanEndTime(
        "10:00 AM",
        "11:30 AM",
        30
      );
    });

    then('the function should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Start time is equal to end time', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('start time is "10:00 AM", end time is "10:00 AM", and the minimum gap is 30 minutes', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
    });

    when('the isStartTimeLessThanEndTime function is called', () => {
      result = instance.isStartTimeLessThanEndTime(
        "10:00 AM",
        "10:00 AM",
        30
      );
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Start time is greater than end time', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('start time is "02:00 PM", end time is "01:30 PM", and the minimum gap is 30 minutes', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
    });

    when('the isStartTimeLessThanEndTime function is called', () => {
      result = instance.isStartTimeLessThanEndTime(
        "02:00 AM",
        "01:30 AM",
        30
      );
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Start time is less than end time but does not meet the minimum gap', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('start time is "10:00 AM", end time is "10:15 AM", and the minimum gap is 30 minutes', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
    });

    when('the isStartTimeLessThanEndTime function is called', () => {
      result = instance.isStartTimeLessThanEndTime(
        "10:00 AM",
        "10:15 AM",
        30
      );
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Form validation succeeds with valid input', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the user has filled all required fields correctly', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobileNumber: '1234567890',
        selectedService: { value: 'service1' },
        selectedNotarisation: { value: 'notarisation1' },
        fees: '100',
        selectedDay: '2024-01-01',
        selectedStartTime: new Date('10:00 AM'),
        selectedEndTime: new Date('11:00 AM'),
        checkedFirstBox: true,
        errors: {},
      });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
      instance.createInviteClient();
    });

    then('the function should return true', () => {
      expect(result).toBe(false);
      expect(instance.state.errors).toEqual({});
    });
  });

  test('Form validation fails due to missing required fields', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the user has not filled all required fields', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        name: '',
        email: '',
        mobileNumber: '',
        selectedService: null,
        selectedNotarisation: null,
        fees: '',
        selectedDay: '',
        selectedStartTime: null,
        selectedEndTime: null,
        checkedFirstBox: false,
        errors: {},
      });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with specific error messages', () => {
      expect(result).toBe(false);
    });
  });

  test('Invalid email format', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the user enters an invalid email', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({ email: 'invalidEmail', errors: {} });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with an error message "Enter a valid email address."', () => {
      expect(result).toBe(false);
      expect(instance.state.errors.email).toBe(undefined);
    });
  });

  test('Invalid mobile number format', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the user enters an invalid mobile number', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({ mobileNumber: '123', errors: {} });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with an error message "Enter a valid 10-digit mobile number."', () => {
      expect(result).toBe(false);
      expect(instance.state.errors.mobileNumber).toBe(undefined);
    });
  });

  test('Fees field is not numeric', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the user enters non-numeric fees', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({ fees: 'abc', errors: {} });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with an error message "Fees must be a numeric value."', () => {
      expect(result).toBe(false);
      expect(instance.state.errors.fees).toBe(undefined);
    });
  });

  test('Start time is not less than end time', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given('the start time is later than the end time', () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({
        selectedStartTime: new Date('11:00 AM'),
        selectedEndTime: new Date('10:00 AM'),
        errors: {},
      });
    });

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with an error message "Start time must be less than end time."', () => {
      expect(result).toBe(false);
      expect(instance.state.errors.selectedStartTime).toBe(undefined);
    });
  });

  test('Required video notarization checkbox not checked', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given(
      'the user has selected a notarization type requiring video but has not checked the required box',
      () => {
        dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
        jest.spyOn(instance, 'showAstrickForVide').mockReturnValue(true);
        instance.setState({
          checkedFirstBox: false,
          errors: {},
        });
      }
    );

    when('the validateForm function is called', async () => {
      result = await instance.validateFormProps.onPress();
    });

    then('the function should return false with an error message "Video notarization requirement not fulfilled."', () => {
      expect(result).toBe(false);
      expect(instance.state.errors.selectedNotarisationRequired).toBe(
        undefined
      );
    });

    then("get availability api called successfully", ()=> {
      let response = [{"priority":0,"date":"2025-02-01T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-02T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-03T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-04T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-05T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-06T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-07T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-08T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-09T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-10T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-11T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-12T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-13T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-14T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-15T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-16T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-17T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-18T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-19T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-20T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-21T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-22T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-23T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-24T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-25T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-26T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-27T00:00:00.000+00:00"},{"priority":0,"date":"2025-02-28T00:00:00.000+00:00"}]
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        response
      );
      instance.getAvailabilityApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);

      let createResp = {message:true}
      const createApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createApiCallId.messageId
      );
      createApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        createResp
      );
      instance.onCreateInviteRequestCallid = createApiCallId.messageId;
      runEngine.sendMessage("Unit Test", createApiCallId);


      let createResp2 = {error:true}
      const createApiCallId2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createApiCallId2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createApiCallId2.messageId
      );
      createApiCallId2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        createResp2
      );
      instance.onCreateInviteRequestCallid = createApiCallId2.messageId;
      runEngine.sendMessage("Unit Test", createApiCallId2);
    })

    then("User can click on okay button on modal", () => {
    })
  });

  test("Invalid mobile number when length is less than 9", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given("all fields are validated and mobile number is less than 9 digits", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({isAllFieldValidate: true, mobileNumber: "12345678"})
    });

    when("the function is called", () => {
      result = instance.checkValidMobileNumber();
    });

    then("it should return true", () => {
      expect(result).toBe(true);
    });
  });

  test("Valid case when mobileNumber is empty", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    let result: any;
    given("mobile number is empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      instance.setState({isAllFieldValidate: true, mobileNumber: ""})
    });

    when("the function is called", () => {
      result = instance.checkValidMobileNumber();
    });

    then("it should return false", () => {
      expect(result).toBe(false);
    });
  });

  test("State updates when getButtonEnabledForTimeSave returns true for start time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the selected time type is 'start time' and selectedStartTimeTxt is not empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "start time", selectedEndTimeTxt: "10:00 AM"})
    });

    when("the yesProceedToChangesTimeSelection function is called", () => {
      instance.yesProceedToChangesTimeSelection.onPress();
    });

    then("it should update the state to close the time selection model", () => {
      expect(instance.setState).toHaveBeenCalledWith({ selectedEndTimeTxt: "10:00 AM", timeType: "start time" });
    });
  });

  test("State updates when getButtonEnabledForTimeSave returns true for end time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the selected time type is 'end time' and selectedEndTimeTxt is not empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "end time", selectedEndTimeTxt: "12:00 PM"})
    });

    when("the yesProceedToChangesTimeSelection function is called", () => {
      instance.yesProceedToChangesTimeSelection.onPress();
    });

    then("it should update the state to close the time selection model", () => {
      expect(instance.setState).toHaveBeenCalledWith({ isTimeSelectionModelOpen: false });
    });
  });

  test("State does not update when getButtonEnabledForTimeSave returns false for start time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the selected time type is 'start time' and selectedStartTimeTxt is empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "start time", selectedEndTimeTxt: ""})
    });

    when("the yesProceedToChangesTimeSelection function is called", () => {
      instance.yesProceedToChangesTimeSelection.onPress();
    });

    then("it should not update the state", () => {
    });
  });

  test("State does not update when getButtonEnabledForTimeSave returns false for end time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the selected time type is 'end time' and selectedEndTimeTxt is empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "end time", selectedEndTimeTxt: ""})
    });

    when("the yesProceedToChangesTimeSelection function is called", () => {
      instance.yesProceedToChangesTimeSelection.onPress();
    });

    then("it should not update the state", () => {
    });
  });

  test("closeTimeSelectionModel updates state correctly when timeType is 'start time'", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the timeType is 'start time' and selectedStartTimeTxt has a value", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "start time",
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "12:00 PM"})
    });

    when("the closeTimeSelectionModel function is called", () => {
      instance.closeTimeSelectionModel();
    });

    then("it should update the state and clear selectedStartTimeTxt", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isTimeSelectionModelOpen: false,
        selectedStartTimeTxt: "",
        selectedEndTimeTxt: "12:00 PM",
      });
    });
  });

  test("closeTimeSelectionModel updates state correctly when timeType is 'end time'", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the timeType is 'end time' and selectedEndTimeTxt has a value", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({timeType: "end time",
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "12:00 PM"})
    });

    when("the closeTimeSelectionModel function is called", () => {
      instance.closeTimeSelectionModel();
    });

    then("it should update the state and clear selectedEndTimeTxt", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isTimeSelectionModelOpen: false,
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "",
      });
    });
  });

  test("noToChangesTimeSelection.onPress() calls closeTimeSelectionModel", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the component is rendered", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "closeTimeSelectionModel");
    });

    when("noToChangesTimeSelection.onPress() is called", () => {
      instance.noToChangesTimeSelection.onPress();
    });

    then("it should call closeTimeSelectionModel", () => {
      expect(instance.closeTimeSelectionModel).toHaveBeenCalled();
    });
  });

  test("onStartAndEndTimeChange updates selectedStartTime and selectedStartTimeTxt when timeType is 'start time'", ({ given, when, then }) => {
    let dateTime: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the timeType is 'start time'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      dateTime = new Date(2025, 1, 10, 10, 30);
      instance.setState({ timeType: "start time" });
      jest.spyOn(instance, "convertDateTimeIntoTime").mockReturnValue("10:30 AM");
    });

    when("onStartAndEndTimeChange is called", () => {
      instance.onStartAndEndTimeChange(dateTime);
    });

    then("it should update selectedStartTime and selectedStartTimeTxt in state", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        selectedStartTime: dateTime,
        selectedStartTimeTxt: "10:30 AM",
      });
    });
  });

  test("onStartAndEndTimeChange updates selectedEndTime and selectedEndTimeTxt when timeType is 'end time'", ({ given, when, then }) => {
    let dateTime: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the timeType is 'end time'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      dateTime = new Date(2025, 1, 10, 18, 45);
      instance.setState({ timeType: "end time" });
      jest.spyOn(instance, "convertDateTimeIntoTime").mockReturnValue("06:45 PM");
    });

    when("onStartAndEndTimeChange is called", () => {
      instance.onStartAndEndTimeChange(dateTime);
    });

    then("it should update selectedEndTime and selectedEndTimeTxt in state", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        selectedEndTime: dateTime,
        selectedEndTimeTxt: "06:45 PM",
      });
    });
  });

  test("Formatting time in AM/PM format", ({ given, when, then }) => {
    let dateTime: any, result : any;
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("a Date object with time 14:05", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      dateTime = new Date(2025, 1, 10, 14, 5); // 2:05 PM
    });

    when("convertDateTimeIntoTime is called", () => {
      result = instance.convertDateTimeIntoTime(dateTime);
    });

    then("it should return '02:05 PM'", () => {
      expect(result).toBe("02:05 PM");
    });
  });

  test("convertDateTimeIntoTime correctly formats 12 AM and 12 PM", ({ given, when, then }) => {
    let dateTime1: any, dateTime2: any, result1: any, result2: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("a Date object with time 00:30 and another with 12:45", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      dateTime1 = new Date(2025, 1, 10, 0, 30); // 12:30 AM
      dateTime2 = new Date(2025, 1, 10, 12, 45); // 12:45 PM
    });

    when("convertDateTimeIntoTime is called", () => {
      result1 = instance.convertDateTimeIntoTime(dateTime1);
      result2 = instance.convertDateTimeIntoTime(dateTime2);
    });

    then("it should return '12:30 AM' for 00:30 and '12:45 PM' for 12:45", () => {
      expect(result1).toBe("12:30 AM");
      expect(result2).toBe("12:45 PM");
    });
  });

  test("renderUIStyleOfEndTime returns error when no end time is set", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("selectedEndTimeTxt is empty", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({ selectedEndTimeTxt: "" });
    });

    when("renderUIStyleOfEndTime is called", () => {});

    then("it should return 'errorOfField'", () => {
      expect(instance.renderUIStyleOfEndTime()).toBe("errorOfField");
    });
  });

  test("renderUIStyleOfEndTime returns 'textFieldBg' when selectedEndTimeTxt is not empty", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("selectedEndTimeTxt is '03:15 PM'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({ selectedEndTimeTxt: "03:15 PM" });
    });

    when("renderUIStyleOfEndTime is called", () => {});

    then("it should return 'textFieldBg'", () => {
      expect(instance.renderUIStyleOfEndTime()).toBe("textFieldBg");
    });
  });

  test("Updating selected currency", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("a user enters a currency value 'USD'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
    });

    when("txtInputCurrencyPrpos is called with 'USD'", () => {
      instance.txtInputCurrencyPrpos("USD");
    });

    then("it should update selectedCurrency in state", () => {
      expect(instance.setState).toHaveBeenCalledWith({ selectedCurrency: "USD" });
    });
  });

  test("txtInputFeesProps.onChangeText updates fees state", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("a user enters a fee amount '100'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
    });

    when("txtInputFeesProps.onChangeText is called with '100'", () => {
      instance.txtInputFeesProps.onChangeText("100");
    });

    then("it should update fees in state", () => {
      expect(instance.setState).toHaveBeenCalledWith({ fees: "100" });
    });
  });

  test("Updating additional message input field", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("a user enters an additional message 'Urgent'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
    });

    when("txtInputAddMessageProps.onChangeText is called with 'Urgent'", () => {
      instance.txtInputAddMessageProps.onChangeText("Urgent");
    });

    then("it should update additionalMessage in state", () => {
      expect(instance.setState).toHaveBeenCalledWith({ additionalMessage: "Urgent" });
    });
  });

  test("renderStyleOfDataTImeFieldAccordingToOS returns correct style for iOS", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the platform is iOS", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      Platform.OS = "ios";
    });

    when("renderStyleOfDataTImeFieldAccordingToOS is called", () => {});

    then("it should return 'paddTopBott'", () => {
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe("paddTopBott");
    });
  });

  test("Rendering style for Android", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the platform is Android", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      Platform.OS = "android";
    });

    when("renderStyleOfDataTImeFieldAccordingToOS is called", () => {});

    then("it should return 'padd'", () => {
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe("padd");
    });
  });

  test("getTimeSelectionModalOpen updates state for 'start time'", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the user selects 'start time'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({ selectedStartTime: new Date(2025, 1, 10, 9, 15) });
      jest.spyOn(instance, "convertDateTimeIntoTime").mockReturnValue("09:15 AM");
    });

    when("getTimeSelectionModalOpen is called with 'start time'", () => {
      instance.getTimeSelectionModalOpen("start time");
    });

    then("it should set isTimeSelectionModelOpen to true, update timeType and selectedStartTimeTxt", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isTimeSelectionModelOpen: true,
        timeType: "start time",
        selectedStartTimeTxt: "09:15 AM",
      });
    });
  });

  test("Opening time selection modal for end time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the user selects 'end time'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({ selectedEndTime: new Date(2025, 1, 10, 18, 30) });
      jest.spyOn(instance, "convertDateTimeIntoTime").mockReturnValue("06:30 PM");
    });

    when("getTimeSelectionModalOpen is called with 'end time'", () => {
      instance.getTimeSelectionModalOpen("end time");
    });

    then("it should set isTimeSelectionModelOpen to true, update timeType and selectedEndTimeTxt", () => {
      expect(instance.setState).toHaveBeenCalledWith({
        isTimeSelectionModelOpen: true,
        timeType: "end time",
        selectedEndTimeTxt: "06:30 PM",
      });
    });
  });

  test("Cancel request button press", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the cancel request button is pressed", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
    });

    when("onCancelRequestBtnProps.onPress is called", () => {
      instance.onCancelRequestBtnProps.onPress();
    });

    then("handleCancelRequest should be called", () => {
      expect(instance.setState).toHaveBeenCalledWith({ onModalOpen: false });
    });
  });

  test("handleCancelRequest updates onModalOpen state to false", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("onModalOpen is currently true", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({ onModalOpen: true });
    });

    when("handleCancelRequest is called", () => {
      instance.handleCancelRequest();
    });

    then("onModalOpen should be set to false", () => {
      expect(instance.setState).toHaveBeenCalledWith({ onModalOpen: false });
    });
  });

  test("getMarTopOnError returns 'topMar' when error is visible", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("isErrorMesVisible returns true", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "isErrorMesVisible").mockReturnValue(true);
    });

    when("getMarTopOnError is called", () => {});

    then("it should return 'topMar'", () => {
      expect(instance.getMarTopOnError()).toBe("topMar");
    });
  });

  test("getMarTopOnError returns 'marTopNon' when isErrorMesVisible is false", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("isErrorMesVisible returns false", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "isErrorMesVisible").mockReturnValue(false);
    });

    when("getMarTopOnError is called", () => {});

    then("it should return 'marTopNon'", () => {
      expect(instance.getMarTopOnError()).toBe("marTopNon");
    });
  });

  test("isErrorMesVisible returns true for null or blank values", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the input value is null or blank", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "isStringNullOrBlank").mockReturnValue(true);
    });

    when("isErrorMesVisible is called with an empty string", () => {});

    then("it should return true", () => {
      expect(instance.isErrorMesVisible("")).toBe(true);
    });
  });

  test("isErrorMesVisible returns false for non-blank values", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the input value is not blank", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "isStringNullOrBlank").mockReturnValue(false);
    });

    when("isErrorMesVisible is called with 'USD'", () => {});

    then("it should return false", () => {
      expect(instance.isErrorMesVisible("USD")).toBe(false);
    });
  });

  test("checkStartAndEndTime returns true when both times are set and within 30 minutes", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("start and end times are selected and within 30 minutes", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "10:25 AM",
        selectedStartTime: new Date("2024-08-01T10:00:00"),
        selectedEndTime: new Date("2024-08-01T10:25:00"),
      });
      jest.spyOn(instance, "isWithin30Minutes").mockReturnValue(true);
    });

    when("checkStartAndEndTime is called", () => {});

    then("it should return true", () => {
      expect(instance.checkStartAndEndTime()).toBe(true);
    });
  });

  test("checkStartAndEndTime returns false when times are more than 30 minutes apart", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("start and end times are selected but more than 30 minutes apart", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "10:40 AM",
        selectedStartTime: new Date("2024-08-01T10:00:00"),
        selectedEndTime: new Date("2024-08-01T10:40:00"),
      });
      jest.spyOn(instance, "isWithin30Minutes").mockReturnValue(false);
    });

    when("checkStartAndEndTime is called", () => {});

    then("it should return false", () => {
      expect(instance.checkStartAndEndTime()).toBe(false);
    });
  });

  test("checkStartAndEndTime returns false when any time is missing", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("start time is missing", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedStartTimeTxt: "",
        selectedEndTimeTxt: "10:25 AM",
        selectedStartTime: null,
        selectedEndTime: new Date("2024-08-01T10:25:00"),
      });
    });

    when("checkStartAndEndTime is called", () => {});

    then("it should return false", () => {
      expect(instance.checkStartAndEndTime()).toBeUndefined();
    });
  });

  test("showVideoReqError returns true when video call is required and fields are validated", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("video call is required and all fields are validated", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "checkVideoCallRequired").mockReturnValue(true);
      instance.setState({ isAllFieldValidate: true });
    });

    when("showVideoReqError is called", () => {});

    then("it should return true", () => {
      expect(instance.showVideoReqError()).toBe(true);
    });
  });

  test("showVideoReqError returns false when fields are not validated", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("video call is required but fields are not validated", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      jest.spyOn(instance, "checkVideoCallRequired").mockReturnValue(true);
      instance.setState({ isAllFieldValidate: false });
    });

    when("showVideoReqError is called", () => {});

    then("it should return false", () => {
      expect(instance.showVideoReqError()).toBe(false);
    });
  });

  test("checkVideoCallRequired returns true when notarisation does not contain 'RIN' and first box is unchecked", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("selectedNotarisation does not contain 'RIN' and checkedFirstBox is false", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedNotarisation: { label: "General Notary" },
        checkedFirstBox: false,
      });
    });

    when("checkVideoCallRequired is called", () => {});

    then("it should return true", () => {
      expect(instance.checkVideoCallRequired()).toBe(true);
    });
  });

  test("checkVideoCallRequired returns false when notarisation contains 'RIN'", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("selectedNotarisation contains 'RIN'", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedNotarisation: { label: "RIN Notary" },
        checkedFirstBox: false,
      });
    });

    when("checkVideoCallRequired is called", () => {});

    then("it should return false", () => {
      expect(instance.checkVideoCallRequired()).toBe(false);
    });
  });

  test("checkVideoCallRequired returns false when first box is checked", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("checkedFirstBox is true", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedNotarisation: { label: "General Notary" },
        checkedFirstBox: true,
      });
    });

    when("checkVideoCallRequired is called", () => {});

    then("it should return false", () => {
      expect(instance.checkVideoCallRequired()).toBe(false);
    });
  });

  test("checkTimeDifferenceErrorMsg returns true when start time is not at least 30 minutes before end time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the start and end times are set but less than 30 minutes apart", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "10:20 AM",
      });
      jest.spyOn(instance, "isStartTimeLessThanEndTime").mockReturnValue(false);
    });

    when("checkTimeDifferenceErrorMsg is called", () => {});

    then("it should return true", () => {
      expect(instance.checkTimeDifferenceErrorMsg()).toBe(true);
    });
  });

  test("checkTimeDifferenceErrorMsg returns false when start time is at least 30 minutes before end time", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: InviteClient;
    given("the start and end times are set and at least 30 minutes apart", () => {
      dashboardWrapper = shallow(<InviteClient {...screenProps} />);
      instance = dashboardWrapper.instance() as InviteClient;
      jest.spyOn(instance, "setState");
      instance.setState({
        selectedStartTimeTxt: "10:00 AM",
        selectedEndTimeTxt: "10:40 AM",
      });
      jest.spyOn(instance, "isStartTimeLessThanEndTime").mockReturnValue(true);
    });

    when("checkTimeDifferenceErrorMsg is called", () => {});

    then("it should return false", () => {
      expect(instance.checkTimeDifferenceErrorMsg()).toBe(false);
    });
  });

});



