import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CreateQuote from "../../src/CreateQuote"
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
    },
    id: "CreateQuote"
}

const feature = loadFeature('./__tests__/features/CreateQuote-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to Level0', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CreateQuote;

        given('I am a User loading Level0', () => {
            exampleBlockA = shallow(<CreateQuote {...screenProps} />);
        });

        when('I navigate to the Level0', () => {
            instance = exampleBlockA.instance() as CreateQuote

        });

        then('Level0 will load with out errors', () => {
            let feedbackButtonlevel0 = exampleBlockA.findWhere((node) => node.prop('testID') === 'level0feedback');
            feedbackButtonlevel0.simulate('press');
            let data =   {
                attributes: {
                  comment: "this.state.newCommentText"
                }
              }
            const requestMessage: Message = new Message(getName(MessageEnum.RestAPIResponceMessage))
            requestMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), requestMessage.messageId);;
            requestMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {data})
            instance.quoteAPICallId = requestMessage.messageId;
            runEngine.sendMessage("Unit Test", requestMessage);
      expect(feedbackButtonlevel0).toBeDefined()
            
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
           expect(itemNameButton).toBeDefined()
        });

        then('I can select the button with with out errors', () => {   
            let selectdropdown = exampleBlockA.findWhere((node) => node.prop("data-test-id") === "selectdropdown");
            selectdropdown.simulate('onSelect','hello');
            const items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
              ];
       selectdropdown.renderProp('onSelect')(items)
 selectdropdown.renderProp('renderDropdownIcon')('upright')
 selectdropdown.renderProp('rowTextForSelection')(items)
 selectdropdown.renderProp('buttonTextAfterSelection')("name")

 let submitButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'level0submit');
 submitButton.simulate('press');
           expect(submitButton).toBeDefined()

        });

        then('I can leave the screen with out errors', () => {
            let cancelButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'level0cancel');
            cancelButton.simulate('press');
            expect(cancelButton).toBeDefined();
        });
    });


});
