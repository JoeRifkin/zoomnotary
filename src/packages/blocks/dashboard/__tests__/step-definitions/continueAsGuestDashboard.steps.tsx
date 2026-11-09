import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import ContinueAsGuestDashboard from "../../src/ContinueAsGuestDashboard";
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { Platform, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "ContinueAsGuestDashboard"
};
const feature = loadFeature("./__tests__/features/continueAsGuestDashboard-scenario.feature");


defineFeature(feature, test => {
  let state: any;
  let originalPlatform: any;

  beforeAll(() => {
    originalPlatform = Platform.OS;
  });
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

  });


  test('Open the login/signup modal via button press', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    when('the user presses the "Open Login/Sign Up" button', () => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      instance.openLoginSignUpModel.onPress();
    });

    then('the login/signup modal should be open', () => {
      expect(instance.state.isOpenLoginSignUpModel).toBe(true);
    });
  });

  test('Open the login/signup modal via bottom tab change', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    when('the user changes the bottom tab', () => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      instance.onChangeBottomTab(1); // Example bottom tab index
    });

    then('the login/signup modal should be open', () => {
      expect(instance.state.isOpenLoginSignUpModel).toBe(true);
    });
  });

  test('Close the login/signup modal via button press', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    beforeEach(() => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      instance.setState({ isOpenLoginSignUpModel: true }); // Ensure modal starts as open
    });

    when('the user presses the "Close Login/Sign Up" button', () => {
      instance.closeModelOfLoginSign.onPress();
    });

    then('the login/signup modal should be closed', () => {
      expect(instance.state.isOpenLoginSignUpModel).toBe(false);
    });
  });

  test('Book Now button is pressed', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    let sendMock: any;
    when('the user presses the "Book Now" button', () => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      sendMock = jest.fn();
      instance.send = sendMock;
      instance.btnBookNowProps.onPress();
    });

    then('a "NavigationContinueAsGuestMessage" should be sent with the correct props', () => {
      expect(sendMock).toHaveBeenCalledTimes(1);
      const sentMessage = sendMock.mock.calls[0][0];
      expect(sentMessage).toBeInstanceOf(Message);
      expect(sentMessage.id).toBe(getName(MessageEnum.NavigationContinueAsGuestMessage));
      expect(sendMock).toHaveBeenCalled();
    });
  });

  test('Log In button is pressed', ({ when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    let sendMock: any;
    when('the user presses the "Log In" button', () => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      sendMock = jest.fn();
      instance.send = sendMock;
      instance.callLogInBtn();
    });

    then('the login/signup modal should close', () => {
      expect(instance.state.isOpenLoginSignUpModel).toBe(false);
    });

    and('a "NavigationEmailLogInMessage" should be sent with the correct props', () => {
      expect(sendMock).toHaveBeenCalledTimes(1);
      const sentMessage = sendMock.mock.calls[0][0];
      expect(sentMessage).toBeInstanceOf(Message);
      expect(sentMessage.id).toBe(getName(MessageEnum.NavigationEmailLogInMessage));
      expect(sendMock).toHaveBeenCalled();
    });
  });

  test('User clicks the Sign Up button', ({ when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuestDashboard;
    let sendMock: any;
    when('the user presses the "Sign Up" button', async () => {
      requestDetail = shallow(<ContinueAsGuestDashboard {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuestDashboard;
      sendMock = jest.fn();
      instance.send = sendMock;
      await instance.callSignUpBtn();
    });

    then('the login sign-up model should be closed', () => {
      expect(instance.state.isOpenLoginSignUpModel).toBe(false);
    });

    and('the user type should be saved in AsyncStorage', async () => {
      const userType = await AsyncStorage.getItem('UserType');
      expect(userType).toBe('need');
    });

    and('the correct message should be sent', () => {
      expect(sendMock).toHaveBeenCalledTimes(1);
      const sentMessage = sendMock.mock.calls[0][0];
      expect(sentMessage).toBeInstanceOf(Message);
      expect(sentMessage.id).toBe(getName(MessageEnum.NavigateEmailSignUpMessage));
      expect(sendMock).toHaveBeenCalled();
    });
  });

});
