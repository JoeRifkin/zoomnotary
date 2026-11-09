import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Payments from "../../src/Payments"
const navigation = require("react-navigation")

const screenProps = {
  navigation: {
    goBack:jest.fn(),
  },
  id: "Payments"
}

const feature = loadFeature('./__tests__/features/payments-scenario.feature');

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


const statusFailResponse = {
  message: 'The setup was unsuccessful.'
}

const statusSuccessResponse = {
  message: 'The setup was successful.',
  currency: '',
  account_email: '',
  account_name: ''
}


const stripeConnectResponse = {
  "data": {
    "url": "https://connect.stripe.com/setup/s/acct_1Q10mkR79KMPq8M9/JUJuwFfQo0CW"
  },
  "connected_account": "acct_1Q10mkR79KMPq8M9"
}
defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.useFakeTimers()
  });

  test('User navigates to Payments', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Payments;

    given('I am a User loading Payments', () => {
      exampleBlockA = shallow(<Payments {...screenProps} />);
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData), JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when('I navigate to the Payments status api will be called', () => {
      instance = exampleBlockA.instance() as Payments
      jest.advanceTimersByTime(1000)
      mockAPICall(instance, "stripeConnectStatusApiCallId", statusFailResponse);

    });

    then('user have to connect his acccount', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when('I click on the connect account btn i will be redirected to the stripe', () => {
      const AccountBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'AccountBtn')
      AccountBtn.props().onPress()
      mockAPICall(instance, "stripeConnectApiCallId", stripeConnectResponse);
      console.log('AccountBtn', AccountBtn.props())
      const request = { url: 'https://example.com/failure' };
      instance.handleShouldStartLoadWithRequest(request);

    });

    then('the process will fail', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when('I click on the connect account btn i will be redirected to the stripe', () => {
      const AccountBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'AccountBtn')
      AccountBtn.props().onPress()
      console.log('AccountBtn', AccountBtn.props())
      const request = { url: 'https://example.com/success' };
      instance.handleShouldStartLoadWithRequest({url:'sdf'}); 
      instance.handleShouldStartLoadWithRequest(request); 

    });

    then('the process will success and will see the details', () => {
      expect(exampleBlockA).toBeTruthy();
      mockAPICall(instance, "stripeConnectStatusApiCallId", statusSuccessResponse);
    });

    when('I click on the disconnect account btn', () => {
      const AccountBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'AccountBtn')
      AccountBtn.props().onPress();
    });

    then('modal will be show to the user', () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when('I click on the yes , disconnect  btn', () => {
      const onDisconnect = exampleBlockA.findWhere((node) => node.prop('testID') === 'onDisconnect')
      mockAPICall(instance, "stripeDisConnectApiCallId", {error:"Active requests needs to be resolved before account stripe disconnect"});
      mockAPICall(instance, "stripeDisConnectApiCallId", {message:'Stripe account successfully disconnected.'});

      onDisconnect.simulate('press')

    });

    then('modal will be closed and account will be disconnected', () => {
      expect(exampleBlockA).toBeTruthy();
      let customHeader = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customHeader"
      );
      customHeader.props().goBack()
    });

  });


});
