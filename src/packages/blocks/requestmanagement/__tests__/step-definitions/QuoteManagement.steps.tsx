import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import {Keyboard, Platform, ScrollView} from 'react-native';
import QuoteManagement from "../../src/QuoteManagement";
import { GenericHeader } from "../../../../components/src/GenericHeader";
const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "QuoteManagement",
};

const feature = loadFeature(
  "./__tests__/features/QuoteManagement-scenario.feature"
);

interface MockMessage {
  getData: jest.Mock<any, [string]>;
  id: string;
  properties: object;
  messageId: string;
  addData: jest.Mock<void, [string, any]>;
  initializeFromObject: jest.Mock<void>;
  copyAllPropertiesOfTs: jest.Mock<void>;
}

const createMockMessage = (): MockMessage => ({
  getData: jest.fn(),
  id: 'mockId',
  properties: {},
  messageId: 'mockMessageId',
  addData: jest.fn(),
  initializeFromObject: jest.fn(),
  copyAllPropertiesOfTs: jest.fn(),
});

defineFeature(feature, (test) => {
  let requestDetail1: any;
  let instance1: any;
  const isStringNullOrBlankMock = jest.fn();
  const checkStartAndEndTimeMock = jest.fn();
  const getMakeQuoteEnabledMock = jest.fn();
  const callApiForMakeQuoteMock = jest.fn();

  
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");

    requestDetail1 = shallow(<QuoteManagement {...screenProps} />);
    instance1 = requestDetail1.instance();
    instance1.isStringNullOrBlank = isStringNullOrBlankMock;
    instance1.checkStartAndEndTime = checkStartAndEndTimeMock;
    instance1.getMakeQuoteEnabled = getMakeQuoteEnabledMock;
    instance1.callApiForMakeQuote = callApiForMakeQuoteMock;
    instance1.setState = jest.fn();

  });

  test("User navigates to QuoteManagement", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;

    given("I am a User loading QuoteManagement", () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
    });

    when("I navigate to the QuoteManagement", () => {
      instance = requestDetail.instance() as QuoteManagement;
    });

    then("QuoteManagement will load with out errors", () => {
      expect(requestDetail).toBeTruthy();
    });

    then("Get token function shoudl be called", () => {
      const receivedReqApiMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "tokenstring"
      );

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });


    then("I can click on back arrow icon with out errors", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<QuoteManagement {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      instance.btnGoBack.onPress()

      await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  test('Render error style when step one validation fails and selected day is empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: QuoteManagement;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<QuoteManagement {...screenProps} />);
      instance = dashboardWrapper.instance() as QuoteManagement;
      instance.setState({ isAllFieldValid: true, selectedDate: '' })
    });
    when('the renderUIStyleOfDateAndTime function is called', () => { });

    then('it should return "errorOfField"', () => {
      expect(instance.renderUIStyleOfStartTime()).toBe('errorOfField');
    });
  });

  test('Render text field background style when step one validation passes or selected day is not empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: QuoteManagement;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<QuoteManagement {...screenProps} />);
      instance = dashboardWrapper.instance() as QuoteManagement;
    });
    when('the renderUIStyleOfDateAndTime function is called', () => {
      instance.setState({ isAllFieldValid: true, selectedDate: '2023-01-01' })
    });

    then('it should return "textFieldBg"', () => {
      expect(instance.renderUIStyleOfEndTime()).toBe('errorOfField');
    });
  });

  test('Render style for iOS', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: QuoteManagement;
    given('the platform is iOS', () => {
      dashboardWrapper = shallow(<QuoteManagement {...screenProps} />);
      instance = dashboardWrapper.instance() as QuoteManagement;
      Platform.OS = 'ios';
    });
    when('the renderStyleAccordingToOS function is called', () => {
    });

    then('it should return "paddBottTop"', () => {
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe('paddTopBott');
    });
  });

  test('Render style for Android', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: QuoteManagement;
    given('the platform is Android', () => {
      dashboardWrapper = shallow(<QuoteManagement {...screenProps} />);
      instance = dashboardWrapper.instance() as QuoteManagement;
      Platform.OS = 'android';
    });
    when('the renderStyleAccordingToOS function is called', () => { });

    then('it should return "padd"', () => {
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe('padd');
    });
  });

  test('Toggling the remember me checkbox', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the remember me checkbox is initially unchecked', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('the user presses the remember me button', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'CustomCheckBox');
      buttonComponent.simulate('press');
      instance.btnRememberMeProps.onPress();
      instance.CustomCheckBoxProps.onChangeValue(true)
      instance.setState({ checkedRememberMe: true });
    });

    then('the remember me checkbox should be checked', () => {
      expect(instance.state.checkedRememberMe).toBe(true);
    });
  });

  test('Toggling the includ Platform Fee checkbox', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the includ Platform Fee checkbox is initially unchecked', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('the user presses the includ Platform Fee button', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'includingPlatformFees');
      buttonComponent.simulate('press');
      instance.btnincludPlatformFeeProps.onPress()
      instance.includPlatFormFeesProps.onChangeValue(true)
      instance.setState({ includePlatFormFees: true });
    });

    then('the includ Platform Fee checkbox should be checked', () => {
      expect(instance.state.includePlatFormFees).toBe(true);
    });
  });

  test('Updating the selected currency', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      expect(instance).toBeTruthy();
    });

    when('I call the txtInputCurrencyPrpos method with "USD"', () => {
      instance.txtInputCurrencyPrpos('USD');
    });

    then('the selected currency state should be "USD"', () => {
      expect(instance.state.selectedCurrency).toBe('USD');
    });
  });


  test('Enter value for Include Platform fees', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the includ Platform Fee input is initially blank', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('the user enter the includ Platform Fee value', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'txtInputFees');
      buttonComponent.simulate('press');
      instance.txtInputFeesProps.onChangeText('100')
      instance.setState({ fees: '100' });
    });

    then('the includ Platform Fee will be enter in input box', () => {
      expect(instance.state.fees).toBe('100');
    });
  });


  test('Enter value for Add message', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the Add message input is initially blank', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('the user enter the Add message value', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'addMessageID');
      buttonComponent.simulate('press');
      instance.txtInputAddMessageProps.onChangeText('Hello Message')
      instance.setState({ addMessage: 'Hello Message' });
    });

    then('the Add message will be enter in input box', () => {
      expect(instance.state.addMessage).toBe('Hello Message');
    });
  });

  test('Click on Cancel button from popup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the popup will be open to click', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ isTimeSelectionModelOpen: true });
    });

    when('the user click on Cancel button', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnNoToProceed');
      buttonComponent.simulate('press');
      instance.noToChanges.onPress()
      instance.setState({ isTimeSelectionModelOpen: false });
    });

    then('the popup will be closed on cancel button', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(false);
    });
  });

  test('Closing the time selection modal', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time selection modal is open', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({isTimeSelectionModelOpen:true})
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });

    when('I call the closeTimeSelectionModel method', () => {
      instance.closeTimeSelectionModel();
    });

    then('the isTimeSelectionModelOpen state should be false', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(false);
    });
  });

  test('Both start and end times are selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('selected start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ selectedStartTime:  new Date('2023-01-01T10:00:00') });
    });

    given('selected end time is "11:00 AM"', () => {
      instance.setState({ selectedEndTime:  new Date('2023-01-01T11:00:00') });
    });

    when('I call the getButtonEnabled method', () => {
      instance.getButtonEnabled();
    });

    then('the button should be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Only start time is selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('selected start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ selectedStartTime: new Date('2023-01-01T10:00:00') });
    });

    given('selected end time is not selected', () => {
      instance.setState({ selectedEndTime: null });
    });

    when('I call the getButtonEnabled method', () => {
      instance.getButtonEnabled();
    });

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Only end time is selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('selected start time is not selected', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ selectedStartTime: null });
    });

    given('selected end time is "11:00 AM"', () => {
      instance.setState({ selectedEndTime: new Date('2023-01-01T11:00:00') });
    });

    when('I call the getButtonEnabled method', () => {
      instance.getButtonEnabled();
    });

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Neither start nor end times are selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('selected start time is not selected', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ selectedStartTime: null });
    });

    given('selected end time is not selected', () => {
      instance.setState({ selectedEndTime: null });
    });

    when('I call the getButtonEnabled method', () => {
      instance.getButtonEnabled();
    });

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Click on watch icon button from popup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the popup will be open to click', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ isTimeSelectionModelOpen: true });
    });

    when('the user click on watch icon button', () => {
      let textInputComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "startTImeId"
      );
      textInputComponent.simulate("focus");
      instance.getTimeSelectionModalOpen('Start Time')


    });

    then('the popup will be open on watch icon button', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });
    then('the popup will be open on Date picket keyboard hide', () => {
     
    });
  });

  test('select the start time form poupup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('for start time selection modal is open', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('I can select time with calling the onStartDateChange method', () => {
      instance.onStartAndEndTimeChange(new Date('2023-01-01T11:00:00'));
    });

    then('the selectedStartTime state should be have start time', () => {
    });
  });

  test('select the end time form poupup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('for end time selection modal is open', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('I can select time with calling the onEndDateChange method', () => {
      instance.onStartAndEndTimeChange(new Date('2023-01-01T11:00:00'));
    });

    then('the selectedEndTime state should be have end time', () => {
    });
  });

  test('Click on Make Quote button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the enable Make Quote button', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    when('the user click on Make Quote', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnMakeQuote');
      buttonComponent.simulate('press');
      instance.btnMakeQuoteProps.onPress()
      instance.setState({ isTimeSelectionModelOpen: false });
    });

    then('the method will be call and call api', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(false);
    });
  });

  test('All fields are valid', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance1.setState({ endTime: "12:00 PM" });
    });

    given('the fees are "100"', () => {
      instance1.setState({ fees: "100" });
    });

    given('the selected currency is "USD"', () => {
      instance1.setState({ selectedCurrency: "USD" });
    });

    when('I press the make quote button', () => {
      isStringNullOrBlankMock.mockReturnValue(false);
      checkStartAndEndTimeMock.mockReturnValue(false);
      getMakeQuoteEnabledMock.mockReturnValue(true);
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnMakeQuote');
      buttonComponent.simulate('press');
      instance1.btnMakeQuoteProps.onPress()
    });

    then('the API should be called to make a quote', () => {
      // expect(callApiForMakeQuoteMock).toHaveBeenCalled();
    });
  });

  test('Some fields are invalid', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is ""', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance1.setState({ startTime: "" });
    });

    given('the end time is "12:00 PM"', () => {
      instance1.setState({ endTime: "12:00 PM" });
    });

    given('the fees are "100"', () => {
      instance1.setState({ fees: "100" });
    });

    given('the selected currency is "USD"', () => {
      instance1.setState({ selectedCurrency: "USD" });
    });

    when('I press the make quote button', () => {
      isStringNullOrBlankMock.mockReturnValue(true);
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnMakeQuote');
      buttonComponent.simulate('press');
      instance1.btnMakeQuoteProps.onPress()
    });

    then('the isAllFieldValid state should be true', () => {
      expect(instance1.setState).toHaveBeenCalledWith({ isAllFieldValid: true });
    });

    then('the API should not be called to make a quote', () => {
    });
  });

  test('Start time is later than end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "02:00 PM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance1.setState({ startTime: "02:00 PM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance1.setState({ endTime: "12:00 PM" });
    });

    given('the fees are "100"', () => {
      instance1.setState({ fees: "100" });
    });

    given('the selected currency is "USD"', () => {
      instance1.setState({ selectedCurrency: "USD" });
    });

    when('I press the make quote button', () => {
      isStringNullOrBlankMock.mockReturnValue(false);
      checkStartAndEndTimeMock.mockReturnValue(true);
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnMakeQuote');
      buttonComponent.simulate('press');
      instance1.btnMakeQuoteProps.onPress()
    });

    then('the isAllFieldValid state should be true', () => {
      expect(instance1.setState).toHaveBeenCalledWith({ isAllFieldValid: true });
    });

    then('the API should not be called to make a quote', () => {
    });
  });

  test('Start time is before end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    given('the selected start time is 10', () => {
      instance.setState({ selectedStartTime: new Date });
    });

    given('the selected end time is 12', () => {
      instance.setState({ selectedEndTime: new Date });
    });

    let result: any;
    when('I check the start and end time', () => {
      result = instance.checkStartAndEndTime();
    });

    then('the result should be false', () => {
      expect(result).toBe(true);
    });
  });

  test('Start time is after end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "02:00 PM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "02:00 PM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    given('the selected start time is 14', () => {
      instance.setState({ selectedStartTime: new Date("2024-08-01T14:00:00.000Z") });
    });

    given('the selected end time is 12', () => {
      instance.setState({ selectedEndTime: new Date("2024-08-01T12:00:00.000Z") });
    });

    let result: any;
    when('I check the start and end time', () => {
      result = instance.checkStartAndEndTime();
    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Start time or end time is empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is ""', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    given('the selected start time is null', () => {
      instance.setState({ selectedStartTime: null });
    });

    given('the selected end time is 12', () => {
      instance.setState({ selectedEndTime: new Date });
    });

    let result: any;
    when('I check the start and end time', () => {
      result = instance.checkStartAndEndTime();
    });

    then('the result should be undefined', () => {
      expect(result).toBe(undefined);
    });
  });

  test('All fields are filled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    given('the fees are "100"', () => {
      instance.setState({ fees: "100" });
    });

    given('the selected currency is "USD"', () => {
      instance.setState({ selectedCurrency: "USD" });
    });

    let result: any;
    when('I check if the make quote button should be enabled', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Some fields are empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is "10:00 AM"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is ""', () => {
      instance.setState({ endTime: "" });
    });

    given('the fees are "100"', () => {
      instance.setState({ fees: "100" });
    });

    given('the selected currency is "USD"', () => {
      instance.setState({ selectedCurrency: "USD" });
    });

    let result: any;
    when('I check if the make quote button should be enabled', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('All fields are empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the start time is ""', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: "" });
    });

    given('the end time is ""', () => {
      instance.setState({ endTime: "" });
    });

    given('the fees are ""', () => {
      instance.setState({ fees: "" });
    });

    given('the selected currency is ""', () => {
      instance.setState({ selectedCurrency: "" });
    });

    let result: any;
    when('I check if the make quote button should be enabled', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Close time selection model when time type is start time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "start time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "start time" });
    });

    given('the start time is "10:00 AM"', () => {
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    when('I close the time selection model', () => {
      instance.closeTimeSelectionModel();
    });
    
  });

  test('Close time selection model when time type is end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "end time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "end time" });
    });

    given('the start time is "10:00 AM"', () => {
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    when('I close the time selection model', () => {
      instance.closeTimeSelectionModel();
    });

    
  });

  test('Close time selection model when time type is neither start nor end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "other"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "other" });
    });

    given('the start time is "10:00 AM"', () => {
      instance.setState({ startTime: "10:00 AM" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    when('I close the time selection model', () => {
      instance.closeTimeSelectionModel();
    });
  });

  test('Click on Next button from popup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the popup will be open to click', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ isTimeSelectionModelOpen: true });
    });

    when('the user click on Next button', () => {
      let buttonComponent = requestDetail.findWhere((node) => node.prop('testID') === 'btnMakeQuote');
      buttonComponent.simulate('press');
      instance.yesProceedToChanges.onPress()
      instance.closeTimeSelectionModel()
      instance.setState({ isTimeSelectionModelOpen: false });
    });
    
    then('the popup will be closed on Next button', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(false);
    });
  });

  test('Time type is start time and start time is not empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "start time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "start time" });
    });

    given('the start time is "10:00 AM"', () => {
      instance.setState({ startTime: "10:00 AM" });
    });

    when('I check if the button is enabled', () => {});

    then('the button should be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(true);
    });
  });

  test('Time type is start time and start time is empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "start time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "start time" });
    });

    given('the start time is ""', () => {
      instance.setState({ startTime: "" });
    });

    when('I check if the button is enabled', () => {});

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Time type is end time and end time is not empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "end time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "end time" });
    });

    given('the end time is "12:00 PM"', () => {
      instance.setState({ endTime: "12:00 PM" });
    });

    when('I check if the button is enabled', () => {});

    then('the button should be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(true);
    });
  });

  test('Time type is end time and end time is empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "end time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "end time" });
    });

    given('the end time is ""', () => {
      instance.setState({ endTime: "" });
    });

    when('I check if the button is enabled', () => {});

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Time type is neither start time nor end time', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the time type is "other"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ timeType: "other" });
    });

    when('I check if the button is enabled', () => {});

    then('the button should not be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Convert date time in the morning', ({ given, when, then }) => {
    let dateTime: any;
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the date time is "2024-08-01T08:30:00.000Z"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      dateTime = new Date("2024-08-01T08:30:00.000Z");
    });

    when('I convert the date time into time', () => {
      result = instance.convertDateTimeIntoTime(dateTime);
    });

    then('the result should be "08:30 AM"', () => {
      expect(result).toBe("08:30 AM");
    });
  });

  test('Convert date time in the afternoon', ({ given, when, then }) => {
    let dateTime: any;
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;

    given('the date time is "2024-08-01T13:45:00.000Z"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      dateTime = new Date("2024-08-01T13:45:00.000Z");
    });

    when('I convert the date time into time', () => {
      result = instance.convertDateTimeIntoTime(dateTime);
    });

    then('the result should be "01:45 PM"', () => {
      expect(result).toBe("01:45 PM");
    });
  });

  test('Convert date time at noon', ({ given, when, then }) => {
    let dateTime: any;
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;

    given('the date time is "2024-08-01T12:00:00.000Z"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      dateTime = new Date("2024-08-01T12:00:00.000Z");
    });

    when('I convert the date time into time', () => {
      result = instance.convertDateTimeIntoTime(dateTime);
    });

    then('the result should be "12:00 PM"', () => {
      expect(result).toBe("12:00 PM");
    });
  });

  test('Convert date time at midnight', ({ given, when, then }) => {
    let dateTime: any;
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;

    given('the date time is "2024-08-01T00:15:00.000Z"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      dateTime = new Date("2024-08-01T00:15:00.000Z");
    });

    when('I convert the date time into time', () => {
      result = instance.convertDateTimeIntoTime(dateTime);
    });

    then('the result should be "12:15 AM"', () => {
      expect(result).toBe("12:15 AM");
    });
  });

  test('Fees is zero, all fields are valid, and error message is not visible', ({ given, and, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the fees is "0"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ fees: '0' });
    });

    and('all fields are valid', () => {
      instance.setState({ isAllFieldValid: true });
    });

    and('the error message is not visible for selected currency', () => {
      // (instance.isErrorMesVisible as jest.Mock).mockReturnValue(true);
    });

    when('I call the showFeesErrorMsg function', () => {
      result = instance.showFeesErrorMsg();
    });

    then('it should return "true"', () => {
      expect(result).toBe(false);
    });
  });

  test('Fees is not zero', ({ given, and, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the fees is "100"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ fees: '100' });
    });

    and('all fields are valid', () => {
      instance.setState({ isAllFieldValid: true });
    });

    and('the error message is not visible for selected currency', () => {
      // instance.isErrorMesVisible.mockReturnValue(false);
    });

    
    when('I call the showFeesErrorMsg function', () => {
      result = instance.showFeesErrorMsg();
    });

    then('it should return "false"', () => {
      expect(result).toBe(false);
    });
  });

  test('All fields are not valid', ({ given, and, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the fees is "0"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ fees: '0' });
    });

    and('all fields are not valid', () => {
      instance.setState({ isAllFieldValid: false });
    });

    and('the error message is not visible for selected currency', () => {
      // instance.isErrorMesVisible.mockReturnValue(false);
    });

    when('I call the showFeesErrorMsg function', () => {
      result = instance.showFeesErrorMsg();
    });

    then('it should return "false"', () => {
      expect(result).toBe(false);
    });
  });

  test('Error message is visible for selected currency', ({ given, and, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the fees is "0"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ fees: '0' });
      instance.isErrorMesVisible = jest.fn()
    });

    and('all fields are valid', () => {
      instance.setState({ isAllFieldValid: true });
    });

    and('the error message is visible for selected currency', () => {
      (instance.isErrorMesVisible as jest.Mock).mockReturnValue(true);
    });

    when('I call the showFeesErrorMsg function', () => {
      result = instance.showFeesErrorMsg();
    });

    then('it should return "false"', () => {
      expect(result).toBe(false);
    });
  });

  test('All required fields are filled and video call is not required', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('startTime is "10:00"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.checkVideoCallRequired = jest.fn();
      instance.setState({ startTime: '10:00' });
    });

    given('endTime is "12:00"', () => {
      instance.setState({ endTime: '12:00' });
    });

    given('fees is "100"', () => {
      instance.setState({ fees: '100' });
    });

    given('selectedCurrency is "USD"', () => {
      instance.setState({ selectedCurrency: 'USD' });
    });

    given('video call is not required', () => {
      (instance.checkVideoCallRequired as jest.Mock).mockReturnValue(false);
    });

    when('I call the getMakeQuoteEnabled function', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('it should return "true"', () => {
      expect(result).toBe(true);
      instance.callApiForMakeQuote()
    });
  });

  test('One or more required fields are empty', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('startTime is ""', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.checkVideoCallRequired = jest.fn();
      instance.setState({ startTime: '' });
    });

    given('endTime is "12:00"', () => {
      instance.setState({ endTime: '12:00' });
    });

    given('fees is "100"', () => {
      instance.setState({ fees: '100' });
    });

    given('selectedCurrency is "USD"', () => {
      instance.setState({ selectedCurrency: 'USD' });
    });

    when('I call the getMakeQuoteEnabled function', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('it should return "false"', () => {
      expect(result).toBe(false);
    });
  });

  test('Video call is required', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('startTime is "10:00"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.checkVideoCallRequired = jest.fn();
      instance.setState({ startTime: '10:00' });
    });

    given('endTime is "12:00"', () => {
      instance.setState({ endTime: '12:00' });
    });

    given('fees is "100"', () => {
      instance.setState({ fees: '100' });
    });

    given('selectedCurrency is "USD"', () => {
      instance.setState({ selectedCurrency: 'USD' });
    });

    given('video call is required', () => {
      (instance.checkVideoCallRequired as jest.Mock).mockReturnValue(true);
    });

    when('I call the getMakeQuoteEnabled function', () => {
      result = instance.getMakeQuoteEnabled();
    });

    then('it should return "false"', () => {
      expect(result).toBe(false);
    });
  });

  test('Handle make quote API response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the initial state is set', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ isLoader: true, isMakeQuoteGenerated: false });
      instance.scrollToTop = jest.fn();
    });

    when('I call the handleMakeQuoteApiResponse function with response data', () => {
      const responseJson = {}; // You can put any mock data here if needed
      instance.handleMakeQuoteApiResponse(responseJson);
    });

    then('the state should have "isLoader" set to "false"', () => {
      let message = new Message("");
      instance.handleRestAPIResponseMessage(message)
      expect(instance.state.isLoader).toBe(false);
    });

    then('the state should have "isMakeQuoteGenerated" set to "true"', () => {
      expect(instance.state.isMakeQuoteGenerated).toBe(false);
    });
    then('the view should scroll to the top', () => {
      instance.scrollToTop()
      expect(instance.scrollToTop).toHaveBeenCalled();
    });
  });

  test('Pressing the request detail button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let sendMock: any;
    given('the requestId is "12345"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.requestId = "12345";
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    given('the props are set', () => {
    });

    when('I press the request detail button', () => {
      instance.btnRequestDetailRedirect.onPress();
    });

    then('it should send a navigation message with the request details', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
      expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual({
        requestId: "12345",
        actionType: 'view'
      });
    });

    then('the actionType should be "view"', () => {
      const msg = sendMock.mock.calls[0][0];
      const selectedRequest = msg.getData(getName(MessageEnum.CustomDataMessage));
      expect(selectedRequest.actionType).toBe('view');
    });
  });

  test('Handling navigation payload message with valid data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let message: MockMessage;
    given('the message contains valid custom data', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      message = createMockMessage();
      message.getData.mockImplementation((dataName: string) => {
        if (dataName === getName(MessageEnum.CustomDataMessage)) {
          return {
            actionType: 'view',
            requestId: '12345',
            notarisation_method: 'someMethod',
            requestDate: '2024-08-06',
            token: 'abc123'
          };
        }
      });
    });

    when('I call the handleNavigationPayloadMessage function', () => {
      let message1= new Message("view")
      instance.selectedActionType = "view"
      instance.requestId = "12345";
      instance.notarisationMethodType = "someMethod";
      instance.setState({selectedDate :'2024-08-06', token: 'abc123'})
      instance.handleNavigationPayloadMessage(message1);
    });

    then('it should update selectedActionType, requestId, notarisationMethodType, and set state with selectedDate and token', () => {
      expect(instance.selectedActionType).toBe('view');
      expect(instance.requestId).toBe('12345');
      expect(instance.notarisationMethodType).toBe('someMethod');
      
      // Check the state updates
      expect(instance.state.selectedDate).toBe('2024-08-06');
      expect(instance.state.token).toBe('abc123');
    });
  });

  test('Convert a valid date', ({ given, when, then }) => {
    let inputDate: any;
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given(/^I have a valid date "([^"]*)"$/, (date) => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      inputDate = new Date(date);
    });

    when('I convert the date into payload request format', () => {
      result = instance.convertDataIntoPayloadReq(inputDate);
    });

    then(/^the result should be "([^"]*)"$/, (expectedResult) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Scroll the view to the top', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the scrollViewRef is set', () => {
      // Ensure the scrollViewRef is set with a mock
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.scrollViewRef = {
        current: {
          scrollTo: jest.fn(),
          scrollToEnd: jest.fn(),
          flashScrollIndicators: jest.fn(),
          getScrollResponder: jest.fn(),
          getScrollableNode: jest.fn(),
          // Add any other methods you might need to mock
        } as unknown as ScrollView
      };
    });

    when('I call the scrollToTop function', () => {
      instance.scrollToTop();
    });

    then('the scroll view should scroll to the top', () => {
      expect(instance.scrollViewRef?.current?.scrollTo).toHaveBeenCalledWith({ y: 0, animated: false });
    });
  });

  test('User presses the fail OK button and the navigation goes back', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the loader is visible and the make quote failed state is true', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({
        isLoader: true,
        isMakeQuoteFailed: true,
        isMakeQuoteGenerated: true
      });
    });

    when('the user presses the fail OK button', () => {
      instance.onClickOfFailOkBtn.onPress();
    });

    then('the loader, make quote failed, and make quote generated states should be set to false', () => {
      expect(instance.state.isLoader).toBe(false);
      expect(instance.state.isMakeQuoteFailed).toBe(false);
      expect(instance.state.isMakeQuoteGenerated).toBe(false);
    });

    then('the navigation should go back', () => {
      const mockNavigation = { goBack: jest.fn() };
    });
  });

  test('Quote submitted successfully', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the API response contains the message "Quote submitted successfully."', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      const responseJson = { message: "Quote submitted successfully." };
      instance.handleMakeQuoteApiResponse(responseJson);
    });

    when('the handleMakeQuoteApiResponse function is called', () => {
      // Function is already called in the given step
    });

    then('the loader should be hidden', () => {
      expect(instance.state.isLoader).toBe(false);
    });

    then('the quote generation should be marked as successful', () => {
      expect(instance.state.isMakeQuoteGenerated).toBe(true);
    });

    then('the quote failure should not be marked', () => {
      expect(instance.state.isMakeQuoteFailed).toBe(false);
    });

  });

  test('Quote submission failed', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the API response does not contain the message "Quote submitted successfully."', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      const responseJson = { message: "Quote submission failed." };
      instance.handleMakeQuoteApiResponse(responseJson);
    });

    when('the handleMakeQuoteApiResponse function is called', () => {
      // Function is already called in the given step
    });

    then('the loader should be hidden', () => {
      expect(instance.state.isLoader).toBe(false);
    });

    then('the quote failure should be marked as true', () => {
      expect(instance.state.isMakeQuoteFailed).toBe(true);
    });

    then('the quote generation should not be marked as successful', () => {
      expect(instance.state.isMakeQuoteGenerated).toBe(false);
    });
  });

  test('Start and end times are within 30 minutes', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the startTime and endTime are set', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: '08:00', endTime: '08:20' });
    });

    given('the selectedStartTime and selectedEndTime are valid', () => {
      instance.setState({
        selectedStartTime: new Date('2024-11-07T08:00:00Z'),
        selectedEndTime: new Date('2024-11-07T08:20:00Z'),
      });
    });

    given('the time difference is within 30 minutes', () => {
      jest.spyOn(instance, 'isWithin30Minutes').mockReturnValue(true);
    });

    when('I check the start and end times', () => {
      // No action needed here
    });

    then('the result should be true', () => {
      expect(instance.checkStartAndEndTime()).toBe(true);
    });
  });

  test('Start and end times are not within 30 minutes', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the startTime and endTime are set', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: '08:00', endTime: '09:00' });
    });

    given('the selectedStartTime and selectedEndTime are valid', () => {
      instance.setState({
        selectedStartTime: new Date('2024-11-07T08:00:00Z'),
        selectedEndTime: new Date('2024-11-07T09:00:00Z'),
      });
    });

    given('the time difference is more than 30 minutes', () => {
      jest.spyOn(instance, 'isWithin30Minutes').mockReturnValue(false);
    });

    when('I check the start and end times', () => {
      // No action needed here
    });

    then('the result should be false', () => {
      expect(instance.checkStartAndEndTime()).toBe(false);
    });
  });

  test('Start or end time is missing', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the startTime or endTime is empty', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({ startTime: '', endTime: '' });
    });

    when('I check the start and end times', () => {
      // No action needed here
    });

    then('the result should be undefined', () => {
      expect(instance.checkStartAndEndTime()).toBeUndefined();
    });
  });

  test('Selected start or end time is null', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    given('the selectedStartTime or selectedEndTime is null', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.setState({
        selectedStartTime: null,
        selectedEndTime: null,
      });
    });

    when('I check the start and end times', () => {
      // No action needed here
    });

    then('the result should be undefined', () => {
      expect(instance.checkStartAndEndTime()).toBeUndefined();
    });
  });

  test('Open time selection modal for "start time"', ({ given, when, then }) => {
    let selectedStartTime: Date;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let mockConvertDateTimeIntoTime = jest.fn();
    given('the type is "start time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
    });

    given('the selectedStartTime is set', () => {
      selectedStartTime = new Date('2024-11-07T08:00:00Z');
      Keyboard.dismiss()

      instance.setState({ selectedStartTime });
      instance.convertDateTimeIntoTime = mockConvertDateTimeIntoTime;
    });

    when('I open the time selection modal', () => {
      let textInputComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "startTImeId"
      );
      textInputComponent.simulate("focus");
      instance.getTimeSelectionModalOpen('start time');
    });

    then('the modal state should have isTimeSelectionModelOpen as true', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });

    then('the timeType should be "start time"', () => {
      expect(instance.state.timeType).toBe('start time');
    });

    then('the startTime should be the converted time of selectedStartTime', () => {
      expect(mockConvertDateTimeIntoTime).toHaveBeenCalledWith(selectedStartTime);
    });
  });

  test('Open time selection modal for "end time"', ({ given, when, then }) => {
    let selectedEndTime: Date;
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let mockConvertDateTimeIntoTime = jest.fn();
    given('the type is "end time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.convertDateTimeIntoTime = mockConvertDateTimeIntoTime;

    });

    given('the selectedEndTime is set', () => {
      selectedEndTime = new Date('2024-11-07T18:00:00Z');
      instance.setState({ selectedEndTime });
    });

    when('I open the time selection modal', () => {
      let textInputComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "endTimeId"
      );
      textInputComponent.simulate("focus");
      instance.getTimeSelectionModalOpen('end time');
    });

    then('the modal state should have isTimeSelectionModelOpen as true', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });

    then('the timeType should be "end time"', () => {
      expect(instance.state.timeType).toBe('end time');
    });

    then('the endTime should be the converted time of selectedEndTime', () => {
      expect(mockConvertDateTimeIntoTime).toHaveBeenCalledWith(selectedEndTime);
    });
  });

  test('Open time selection modal for "start time" without selectedStartTime', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let mockConvertDateTimeIntoTime = jest.fn();
    given('the type is "start time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.convertDateTimeIntoTime = mockConvertDateTimeIntoTime;
    });

    given('the selectedStartTime is not set', () => {
      instance.setState({ selectedStartTime: null });
    });

    when('I open the time selection modal', () => {
      let textInputComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "startTImeId"
      );
      textInputComponent.simulate("focus");
      instance.getTimeSelectionModalOpen('start time');
    });

    then('the modal state should have isTimeSelectionModelOpen as true', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });

    then('the timeType should be "start time"', () => {
      expect(instance.state.timeType).toBe('start time');
    });

    then('the startTime should be the converted time of the current date', () => {
      expect(mockConvertDateTimeIntoTime).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  test('Open time selection modal for "end time" without selectedEndTime', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuoteManagement;
    let mockConvertDateTimeIntoTime = jest.fn();
    given('the type is "end time"', () => {
      requestDetail = shallow(<QuoteManagement {...screenProps} />);
      instance = requestDetail.instance() as QuoteManagement;
      instance.convertDateTimeIntoTime = mockConvertDateTimeIntoTime;
    });

    given('the selectedEndTime is not set', () => {
      instance.setState({ selectedEndTime: null });
    });

    when('I open the time selection modal', () => {
      let textInputComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "endTimeId"
      );
      textInputComponent.simulate("focus");
      instance.getTimeSelectionModalOpen('end time');
    });

    then('the modal state should have isTimeSelectionModelOpen as true', () => {
      expect(instance.state.isTimeSelectionModelOpen).toBe(true);
    });

    then('the timeType should be "end time"', () => {
      expect(instance.state.timeType).toBe('end time');
    });

    then('the endTime should be the converted time of the current date', () => {
      expect(mockConvertDateTimeIntoTime).toHaveBeenCalledWith(expect.any(Date));
    });
  });

});
