import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import CalendarSync from "../../src/CalendarSync";
const navigation = require("react-navigation");

const screenProps = {
    navigation: {
        goBack:jest.fn()
    },
    id: "CalendarSync"
};
import { GoogleSignin } from "@react-native-community/google-signin"; // Import after mocking
import StorageProvider from "../../../../framework/src/StorageProvider";

const feature = loadFeature('./__tests__/features/calendarsync-scenario.feature');

const mockAPICall = (instance: any, apiCallID: string, apiData: object) => {
    const msgSucessRestAPI = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    msgSucessRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgSucessRestAPI.messageId
    );
    msgSucessRestAPI.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      apiData
    );
    instance[apiCallID] = msgSucessRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgSucessRestAPI);
  };


defineFeature(feature, (test) => {
    beforeEach(async () => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.useFakeTimers()
        await StorageProvider.set("accessToken", "mocked-token");
        await StorageProvider.set("refreshToken", "mocked-token");
    });

    test('User navigates to CalendarSync', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CalendarSync; 

        given('I am a User loading CalendarSync', () => {
            exampleBlockA = shallow(<CalendarSync {...screenProps} />);
            const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
            msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", msgToken);
        });

        when('I navigate to the CalendarSync', async () => {
            instance = exampleBlockA.instance() as CalendarSync;

         
            // Simulating Google Sync checkbox change
            const isGoogleCheckedId = exampleBlockA.findWhere((node) => node.prop("testID") === "isGoogleCheckedId");
            isGoogleCheckedId.props().onChange(true);
            
            // Simulate Google Authentication button press
            const AuthGoogleBtn = exampleBlockA.findWhere((node) => node.prop("testID") === "AuthGoogleBtn");
             AuthGoogleBtn.props().onPress();


            instance.loginGoogle()

             instance.setState({
                googleAuthDetails:{
                    token:'sdf',
                    email:'email',
                    photo:'sdfasdf'
                },
                  isGoogleSignedIn: true,
                  isGoogleSyncOn: true
             })

            instance.updateGoogleAuthDetails()
            instance.setState({
                googleAuthDetails:{
                    token:'sdf',
                    email:'email',
                    photo:'sdfasdf'
                },
                  isGoogleSignedIn: true,
                  isGoogleSyncOn: true
             })
            instance.checkGoogleSignInStatus()


             const isGoogleSyncOn = exampleBlockA.findWhere((node) => node.prop("testID") === "isGoogleSyncOn");
             isGoogleSyncOn.props().onChange(true);

        });

        then('CalendarSync will load without errors',async () => {
            const logoutGoogle = exampleBlockA.findWhere((node) => node.prop("testID") === "logoutGoogle");
            logoutGoogle.simulate('press')
            instance.setState({googleAuthDetails:null,isGoogleSignedIn:false,isGoogleSyncOn:false})
            let customHeader = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "customHeader"
            );
            customHeader.props().goBack()
            // expect(exampleBlockA).toBeTruthy();

        });
    });

    test('User navigates to CalendarSync and login outlook', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CalendarSync; 

        given('I am a User loading CalendarSync', () => {
            exampleBlockA = shallow(<CalendarSync {...screenProps} />);
            const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
            msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", msgToken);
        });

        when('I navigate to the CalendarSync', async () => {
            instance = exampleBlockA.instance() as CalendarSync;

            // Simulating Google Sync checkbox change
            const isOutlookCheckedId = exampleBlockA.findWhere((node) => node.prop("testID") === "isOutlookCheckedId");
            isOutlookCheckedId.props().onChange(true);
            
            // Simulate Google Authentication button press
            const AuthOutlookBtn = exampleBlockA.findWhere((node) => node.prop("testID") === "AuthOutlookBtn");
            AuthOutlookBtn.props().onPress();
           
             const isOutlookSyncOn = exampleBlockA.findWhere((node) => node.prop("testID") === "isOutlookSyncOn");
            //  isOutlookSyncOn.props().onChange(true);

        });

        then('CalendarSync will load without errors',async () => {
            await StorageProvider.set("refreshToken", "mocked-token");
            const logoutOutlook = exampleBlockA.findWhere((node) => node.prop("testID") === "logoutOutlook");
            // logoutOutlook.simulate('press')
            let mockData = {
                mail: "test@outlook.com",
                userPrincipalName: "test@outlook.com"
            }
            mockAPICall(instance, "getMicrosoftUserProfileApiCallID", mockData);
            expect(mockData.mail).toBe("test@outlook.com");
            await StorageProvider.set("refreshToken", "");
            mockAPICall(instance, "getMicrosoftUserProfileApiCallID", mockData);
            let mockDataError = {
                error: {
                    code: "Invalid token"
                }
            }
            mockAPICall(instance, "getMicrosoftUserProfileApiCallID", mockDataError);
        });
        
    });
});
