import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import MainPage from "../../src/MainPage"
import { jest, beforeEach, expect } from "@jest/globals";
import {View,Alert} from "react-native";
import exp from "constants"

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
    },
    id: "MainPage"
}

const feature = loadFeature('./__tests__/features/MainPage-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
        Alert.alert = jest.fn();
    });

    test('User navigates to QuoteManagement', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: MainPage;

        given('I am a User loading QuoteManagement', () => {
            exampleBlockA = shallow(<MainPage {...screenProps} />);
        });

        when('I navigate to the QuoteManagement', () => {
            instance = exampleBlockA.instance() as MainPage
            
            let feedbackButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'touch');
            feedbackButton.simulate('press');
            
        });

        then('QuoteManagement will load with out errors', () => {
            


              let selectdropdown = exampleBlockA.findWhere((node) => node.prop("data-test-id") === "selectdropdown");  
                //  selectdropdown.simulate('onSelect','hello');
            selectdropdown.renderProp('onSelect')("test")
      selectdropdown.renderProp('renderDropdownIcon')(false)
      selectdropdown.renderProp('renderDropdownIcon')(true)
      selectdropdown.renderProp('rowTextForSelection')("tedt")
      selectdropdown.renderProp('buttonTextAfterSelection')("tdt")   
              // expect(passvalueButton).toBeDefined()
              
              const mockItem = {
                id: 1,
                attributes: {
                  account_id: 21,
                  organization: {
                    name: "Sample Organization",
                  },
                  item_name: "Sample Item",
                  status: "rejected",
                  item_price: "$20.00",
                },
              };

              let flatList1 = exampleBlockA.findWhere(
                node => node.prop("testID") === "flatlistMainpage"
                  ).props().renderItem({item:mockItem});
              const shaloowFunction = shallow(flatList1)

              const renderData = shaloowFunction.findWhere((node) => node.prop('testID') === 'renderPress');
              renderData.simulate('onPress');

              // exampleBlockA.find('FlatList').props().onEndReached({
              //   distanceFromEnd: 0,  // You may need to adjust the distanceFromEnd based on your use case
              // });           
              
              

              const mockItem2 = {
                id: 1,
                attributes: {
                  organization: {
                    name: "Sample Organization",
                  },
                  item_name: "Sample Item",
                  status: "approved",
                  item_price: "$20.00",
                },
              };
             
              let flatList2 = exampleBlockA.findWhere(
                node => node.prop("testID") === "flatlistMainpage"
                  ).props().renderItem({item:mockItem2});
              const shaloowFunction2 = shallow(flatList2)

              const renderData2 = shaloowFunction2.findWhere((node) => node.prop('testID') === 'renderPress');
              // console.log("instancevalue",renderData2.props().style[1].backgroundColor)


              let changeState = exampleBlockA.findWhere((node) => node.prop('testID') === 'changeState');
              changeState.simulate('press','');


              const mockItem3 = {
                id: 1,
                attributes: {
                  organization: {
                    name: "Sample Organization",
                  },
                  item_name: "Sample Item",
                  status: "approved",
                  item_price: "$20.00",
                },
              };
             
              let flatList3 = exampleBlockA.findWhere(
                node => node.prop("testID") === "flatlistMainpage"
                  ).props().renderItem({item:mockItem3});
              const shaloowFunction3 = shallow(flatList3)

              const renderData3 = shaloowFunction3.findWhere((node) => node.prop('testID') === 'renderPress');
              // console.log("instancevalue",renderData3.props().style[1].backgroundColor)

              expect(MainPage).toBeDefined();  
        });

        then('I can enter text with out errors', () => {
            let changeState = exampleBlockA.findWhere((node) => node.prop('testID') === 'changeStateCreator');
            changeState.simulate('press','');
             let buttonComponentadd = exampleBlockA.findWhere((node) => node.prop('testID') === 'addquote');
            buttonComponentadd.simulate('press');
            let data =   {
                attributes: {
                  comment: "this.state.newCommentText"
                }
              }
            const requestMessage: Message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);;
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data})
            
            runEngine.sendMessage("Unit Test", requestMessage);
            expect(buttonComponentadd).toBeDefined();
        });

        then('I can select the button with with out errors', () => {
            
             const goback = jest.fn();
             Alert.alert("Title", "Message", [{ text: "OK", onPress: goback }]);
             expect(MainPage).toBeDefined();

        });

      
    });


});
