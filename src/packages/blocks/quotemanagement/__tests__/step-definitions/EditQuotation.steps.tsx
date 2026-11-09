 import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EditQuotation from "../../src/EditQuotation"
import { jest, beforeEach, expect } from "@jest/globals";

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
        state: {
            params: {
                EditQuotationDetails: {
                    "data": [
                        {
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
                    ]
                }
            }
        }
    },
    id: "EditQuotation"
}

const feature = loadFeature('./__tests__/features/EditQuotation-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to QuoteManagement', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: EditQuotation;

        given('I am a User loading QuoteManagement', () => {
            exampleBlockA = shallow(<EditQuotation {...screenProps} />);
        });

        when('I navigate to the QuoteManagement', () => {
            instance = exampleBlockA.instance() as EditQuotation
          
        });

        then('QuoteManagement will load with out errors', () => {
            let viewButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'touch');
            viewButton.simulate('press');
            let flatList = exampleBlockA.findWhere(
                node => node.prop("testID") === "flatlistEdituser" 
                  );
                  const item = flatList.renderProp("renderItem")({
                    item: { userName: 'User 1' }
                  });
            expect(viewButton).toBeDefined();
        });

        then('I can enter text with out errors', () => {
            let itemNameButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'name');
            itemNameButton.simulate('changeText', 'hello@aol.com');
            let itemPriceButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'price');
            itemPriceButton.simulate('changeText', 'hello@aol.com');
            let itemquantityButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'quantity');
            itemquantityButton.simulate('changeText', 'hello@aol.com');
            let itemdiscountButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'discount');
            itemdiscountButton.simulate('changeText', 'hello@aol.com');
            let itemdescriptionButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'description');
            itemdescriptionButton.simulate('changeText', 'hello@aol.com');
            expect(itemPriceButton).toBeDefined();
        });

        then('I can select the button with with out errors', () => {
            let submitButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'update');
            submitButton.simulate('press');
            let dataUpdate =   {
                attributes: {
                  comment: "this.state.newCommentText"
                }
              }
            const requestMessage: Message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);;
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {dataUpdate})
            instance.userQuoteAPI = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);
           expect(dataUpdate).toBeDefined()
        });

        then('I can leave the screen with out errors', () => {
            let exitButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancel');
            exitButton.simulate('press');
            expect(exitButton).toBeDefined()
            
        });
    });


});
