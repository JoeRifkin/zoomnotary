import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Dashboard from "../../src/Dashboard.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Dashboard"
  }

const feature = loadFeature('./__tests__/features/dashboard-scenario.web.feature');

const responseJson =  {"data":{"id":"5","type":"candidate","attributes":{"total_candidates":260,"sub_attributres":[{"type":"Interview with client","quantity":"100"},{"type":"Submitted for feedback","quantity":"70"},{"type":"Candidates expecting offer","quantity":"50"},{"type":"Candidates accepted","quantity":"40"}]}}}


defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Dashboard', ({ given, when, then }) => {
        let dashboardWrapper:ShallowWrapper;
        let instance:Dashboard; 

        given('I am a User loading Dashboard', () => {
            dashboardWrapper = shallow(<Dashboard {...screenProps}/>);
            expect(dashboardWrapper).toBeTruthy();
        });

        when('I navigate to the Dashboard', () => {
             instance = dashboardWrapper.instance() as Dashboard
        });

        then('Dashboard will load with out errors', () => {
            expect(dashboardWrapper).toBeTruthy();
        });
          
        when("Get success api response on component mount", () => {
          const dashboardApiCallId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          dashboardApiCallId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            dashboardApiCallId.messageId
          );
          dashboardApiCallId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            responseJson
          );
          instance.apiDashboardItemCallId = dashboardApiCallId.messageId;
          runEngine.sendMessage("Unit Test", dashboardApiCallId);
        })

        then("Category type text should be matche with api reponse", () => {
            const categoryTypeText = dashboardWrapper.findWhere((node) => node.prop("data-testid") === "category-type-0")
            // expect(categoryTypeText.props().children).toBe("Interview with client")
          });

      
          when("Dashboard will display notifcation if API failure", () => {
            const magLogInSucessRestAPI = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                errors: "Error"
              }
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceErrorMessage),
              "something went wrong!"
            );
            magLogInSucessRestAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              magLogInSucessRestAPI.messageId
            );
            instance.apiDashboardItemCallId = magLogInSucessRestAPI.messageId;
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI);
          });

          then("error state value should be set as api reponse", () => {
            expect(instance.state.errorMsg).toBe("something went wrong!")
          })

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(dashboardWrapper).toBeTruthy();
        });
    });


});
