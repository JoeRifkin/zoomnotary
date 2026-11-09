import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ChangePassword from "../../src/ChangePassword"
const navigation = require("react-navigation")

const screenProps = {
  navigation: {
    goBack: jest.fn()
  },
  id: "ChangePassword"
}

const feature = loadFeature('./__tests__/features/change-password-scenario.feature');

const userData = {
  meta: {
    profile: {
      data: {
        attributes: {
          name: "John Doe",
          "activated": false,
          "address": null,
          "address_line_2": null,
          "age": null,
          "city": null,
          "company_name": null,
          "contact_name": "",
          "country": null,
          "country_code": null,
          "date_of_birth": null,
          "email": "",
          "first_name": null,
          "full_name": "",
          "full_phone_number": "",
          "gender": null,
          "id": 0,
          "last_name": null,
          "phone_number": null,
          "photo": {
            "url": null,
          },
          "platform": null,
          "post_code": null,
          "role_id": 0,
          "status": "",
          "suspend_until": null,
          "user_name": null,
          "user_type": "",
        }
      }
    },
    token: 'valid_token',
    role: 'end_user'
  }
}

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}


defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.useFakeTimers()
  });

  test('User successfully changes the password', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ChangePassword;

    given('I am a User loading ChangePassword', () => {
      exampleBlockA = shallow(<ChangePassword {...screenProps} />);
      instance = exampleBlockA.instance() as ChangePassword
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData), JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when('I enter the current password, new password, confirm password', () => {
      const currentPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'currentPassword')
      currentPassword.props().onChangeText('Test@1234')


      const newPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword')
      newPassword.props().onChangeText('Test@123')

      jest.advanceTimersByTime(1000)
      mockAPICall(instance, 'passwordHistoryApiCallId', { message: 'Successfully verified that the password is new and not used recently.' })

      const confirmPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'confirmPassword')
      confirmPassword.props().onChangeText('Test@123')
    });

    then('I will submit the change password btn and responds with success', () => {
      const changepasswordBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'changepasswordBtn');
      console.log('changepasswordBtn', changepasswordBtn.props())
      changepasswordBtn.props().onPress()
      mockAPICall(instance, 'changePasswordApiCallId', { message: 'Password Changed' })
    });


    when('im on the success screen i will click dashboard btn', () => {
      const gotoDashBoard = exampleBlockA.findWhere((node) => node.prop('testID') === 'gotoDashBoard')
      gotoDashBoard.simulate('press')
    });

    then('i will go back to dashboard', () => {
      expect(exampleBlockA).toBeTruthy();

    });
  });

  test('User successfully changes the password after failed attempts', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ChangePassword;

    given('I am a User loading ChangePassword', () => {
      exampleBlockA = shallow(<ChangePassword {...screenProps} />);
      instance = exampleBlockA.instance() as ChangePassword
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData), JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when('I enter the current password, and then enter a different new password and confirm password.', () => {
      const currentPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'currentPassword')
      currentPassword.props().onChangeText('Test@1234')


      const newPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword')
      newPassword.props().onChangeText('Test@1234')

      jest.advanceTimersByTime(1000)
      mockAPICall(instance, 'passwordHistoryApiCallId', { message: 'it used.' })

      mockAPICall(instance, 'passwordHistoryApiCallId', { message: 'Successfully verified that the password is new and not used recently.' })

      const confirmPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'confirmPassword')
      confirmPassword.props().onChangeText('Test@123')
    });

    then('I will submit the change password and I will get an error password not match', () => {
      const changepasswordBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'changepasswordBtn');
      console.log('changepasswordBtn', changepasswordBtn.props())
      changepasswordBtn.props().onPress()
    });

    when('I enter the current password wrong, new password, confirm password', () => {
      const currentPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'currentPassword')
      currentPassword.props().onChangeText('Test@1234')


      const newPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'newPassword')
      newPassword.props().onChangeText('Test@')

      jest.advanceTimersByTime(1000)
      mockAPICall(instance, 'passwordHistoryApiCallId', { message: 'Successfully verified that the password is new and not used recently.' })

      const confirmPassword = exampleBlockA.findWhere((node) => node.prop('testID') === 'confirmPassword')
      confirmPassword.props().onChangeText('Test@')
    });

    then('I will submit the change password btn and responds with failure', () => {
      const changepasswordBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'changepasswordBtn');
      console.log('changepasswordBtn', changepasswordBtn.props())
      changepasswordBtn.props().onPress()
      mockAPICall(instance, 'changePasswordApiCallId', { error: 'Incorrect old password.' })
    });



    when('i click on back arrow', () => {
      const customHeader = exampleBlockA.findWhere((node) => node.prop('testID') === 'customHeader')
      customHeader.props().goBack()
    });

    then('i will go back to previous screen', () => {
      expect(exampleBlockA).toBeTruthy();
      instance.componentWillUnmount()
    });
  });


});
