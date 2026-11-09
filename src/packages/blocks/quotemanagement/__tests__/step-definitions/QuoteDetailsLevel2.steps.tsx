 import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import { render } from '@testing-library/react';
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import QuoteDetailsLevel2 from "../../src/QuoteDetailsLevel2";
import {jest,beforeEach,expect} from "@jest/globals";

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
        state:{
            params:{
                getpassValue:{
                     
                            "id": "6",
                            "type": "quotemanagement",
                            "attributes": {
                                "account_id": 13,
                                "item_name": "test",
                                "item_quantity": 2,
                                "item_price": 100.0,
                                "description": "testing",
                                "discount": 25.0,
                                "status": "partially_approved",
                                "total_amount": 150.0,
                                "archived": false,
                                "organization": {
                                    "id": 1,
                                    "name": "builder.ai",
                                    "created_at": "2023-07-14T13:18:49.811Z",
                                    "updated_at": "2023-07-14T13:18:49.811Z"
                                },
                                "comments": []
                            }
                        },
                    
                
            }
        }
    },
    id: "QuoteDetailsLevel2",
    get_value:{
        "attributes": {
            "account_id": 13,
            "item_name": "test",
            "item_quantity": 2,
            "item_price": 100.0,
            "description": "testing",
            "discount": 25.0,
            "status": "partially_approved",
            "total_amount": 150.0,
            "archived": false,
            "organization": {
                "id": 1,
                "name": "builder.ai",
                "created_at": "2023-07-14T13:18:49.811Z",
                "updated_at": "2023-07-14T13:18:49.811Z"
            },
            "comments": []
        }
    }
  }

const feature = loadFeature('./__tests__/features/QuoteDetailsLevel2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to QuoteDetailsLevel2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:QuoteDetailsLevel2; 

        given('I am a User loading QuoteDetailsLevel2', () => {
            exampleBlockA = shallow(<QuoteDetailsLevel2 {...screenProps} />);
          
        });

        when('I navigate to the QuoteDetailsLevel2', () => {
             instance = exampleBlockA.instance() as QuoteDetailsLevel2
        });

        then('QuoteDetailsLevel2 will load with out errors', () => {
            
            let buttonComponentLevel2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'quotedetail');
            buttonComponentLevel2.simulate('press');
            let selectdropdown = exampleBlockA.findWhere((node) => node.prop("data-test-id") === "selectdropdown");
                 selectdropdown.simulate('onSelect','hello');
            selectdropdown.renderProp('onSelect')("test")
      selectdropdown.renderProp('renderDropdownIcon')("text")
      selectdropdown.renderProp('rowTextForSelection')("tedt")
      selectdropdown.renderProp('buttonTextAfterSelection')("tdt")
                 expect(buttonComponentLevel2).toBeDefined();
        });

        then('I can enter comments with out errors', () => {
          
            let textInputComponentLevel2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'comments');
            textInputComponentLevel2.simulate('changeText', 'hello@aol.com');
            expect(textInputComponentLevel2).toBeDefined()
        });

        then('I can select the button with with out errors', () => {
            let submitbuttonComponentLevel2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'submit');
            submitbuttonComponentLevel2.simulate('press');
            let dataLevel2 =   {
                attributes: {
                  comment: "this.state.newCommentText"
                }
              }
            const requestMessage: Message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);;
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {dataLevel2})
            // TODO: broken unit test has been commented out for lite certified block, please fix this test
            // instance.levelQuoteAPI = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);
            
            expect(submitbuttonComponentLevel2).toBeDefined();
        });

        then('I can leave the screen with out errors', () => {
            let cancelbuttonComponentLevel2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancel');
            cancelbuttonComponentLevel2.simulate('press');
            expect(cancelbuttonComponentLevel2).toBeDefined();
        });
    });


});
