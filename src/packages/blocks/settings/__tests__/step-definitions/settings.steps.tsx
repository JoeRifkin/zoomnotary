import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Settings from "../../src/Settings";
import { GenericHeader } from "../../../../components/src/GenericHeader";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Settings"
}

const feature = loadFeature('./__tests__/features/settings-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to settings', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Settings;

        given('I am a User loading settings', () => {
            exampleBlockA = shallow(<Settings {...screenProps} />);
        });

        when('I navigate to the settings', () => {
            instance = exampleBlockA.instance() as Settings
        });

        then('settings will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
          let buttondeleteaccount = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'btndeleteaccount');
            buttondeleteaccount.simulate('press')
            instance.renderEnterPasswordPopup()
            let button = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'btnpress');
            button.simulate('press')
            instance.doButtonPressed()
            instance.setEnableField()
            instance.isStringNullOrBlank("test")
            instance.toggleDeleteAccountPopup()
            instance.onSubmitDeleteAccount()
            instance.toggleConfirmDeleteAccountPopup()
            instance.onDeleteAccount()
            instance.setState({password: "test@123"})
            instance.doEmailLogIn()
           
        });

        then('I can select the button with with out errors', () => {
        });

        then("i can click on back arrow icon with out errors", async () => {
            const mockNavigation = { goBack: jest.fn() };
            const wrapperWithNavigation = shallow(<Settings {...screenProps} navigation={mockNavigation} />);
            let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
            let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press')
            instance.btnGoBack.onPress()

            await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
            expect(mockNavigation.goBack).toHaveBeenCalled();
        });

        then('call login api', () => {
          const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
        
            instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)
        });

        then('call deleteaccount api', () => {
          const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
               message: "Your account has already been deleted."
            });
        
            instance.apiDeleteAccountCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)
        });
        
        
        then('I can leave the screen with out errors', () => {
          const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
              error: "Active requests needs to be resolved before account deletion."
            });
        
            instance.apiDeleteAccountCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Redirecting to Vat and sales page', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: Settings;
        let sendMock: any;
        given('I have a key vat', () => {
            dashboardWrapper = shallow(<Settings {...screenProps} />);
            instance = dashboardWrapper.instance() as Settings;
            sendMock = jest.fn();
            instance.send = sendMock;
        });

        when('I call the redirectToPage function with the key', () => {
          instance.redirectToPage('vat',66);
          instance.redirectToPage('change',66);
        });

        then('it should send a NavigationVatSalesTaxMessage', () => {
            const msg = sendMock.mock.calls[0][0];
            expect(msg).toBeInstanceOf(Message);
            expect(msg.id).toBe(getName(MessageEnum.NavigationMessage));
        });
    });


    test('Store token and user role when the message id is NavigationPayLoadMessage', ({ given, when, then }) => {
        let mockMessage: Message;
        let dashboardWrapper: ShallowWrapper;
        let instance: Settings;
        given('a message with id "NavigationPayLoadMessage"', () => {
            dashboardWrapper = shallow(<Settings {...screenProps} />);
            instance = dashboardWrapper.instance() as Settings;
          mockMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        });
    
        given('the message contains token "mockedToken" and role "admin"', () => {
          mockMessage.getData = jest.fn(() => ({
            token: 'mockedToken',
            role: 'admin'
          }));
        });
    
        when('the storeMDataValue function is called', () => {
          instance.storeMDataValue(mockMessage);
        });
    
        then('it should update the state with the token and user role', () => {
          expect(instance.state.token).toEqual('mockedToken');
          expect(instance.state.getUserRole).toEqual('admin');
        });
      });
    
      test('Do nothing when the message id is not NavigationPayLoadMessage', ({ given, when, then }) => {
        let mockMessage: Message;
        let dashboardWrapper: ShallowWrapper;
        let instance: Settings;
        given('a message with id "SomeOtherMessage"', () => {
            dashboardWrapper = shallow(<Settings {...screenProps} />);
            instance = dashboardWrapper.instance() as Settings;
          mockMessage = new Message('SomeOtherMessage'); // A different message ID
        });
    
        when('the storeMDataValue function is called', () => {
          instance.storeMDataValue(mockMessage);
        });
    
        then('it should not update the state', () => {
          expect(instance.state.token).toBe("");
          expect(instance.state.getUserRole).toBe("");

          const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
              error: "Active requests needs to be resolved before account deletion."
            });
        
            instance.apiDeleteAccountCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)
        });
      });

});
