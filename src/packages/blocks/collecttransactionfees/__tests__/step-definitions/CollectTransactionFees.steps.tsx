// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CollectTransactionFees from "../../src/CollectTransactionFees"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "CollectTransactionFees"
}

const collectTransactionFeesAPIData = {
    data: {
        data: {
            id: "311",
            type: "transaction_fee",
            attributes: {
                id: 311,
                total_fees: 555.0,
                transaction_fees: 65.0
            }
        }
    }
}

const collectTransactionFeesAPIData2 = {
    data: null
}

const transactionPercentageAPIData = {
    data: {
        id: 1,
        transaction_percentage: 10.0,
        created_at: "2023-05-05T06:28:05.907Z",
        updated_at: "2023-05-05T11:24:56.066Z"
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

const mockLoginFailedResponse = {
    "errors": [{ "key": "Login Failed." }]
}


const feature = loadFeature('./__tests__/features/CollectTransactionFees-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CollectTransactionFees', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: CollectTransactionFees;

        given('I am a User loading CollectTransactionFees', () => {
            exampleBlockA = shallow(<CollectTransactionFees {...screenProps} />)
            instance = exampleBlockA.instance() as CollectTransactionFees
        });

        when("Transaction Percentage network request is called", () => {
            mockAPICall(instance, "transactionPercentageAPICallId", transactionPercentageAPIData);
        });

        then('Transaction percentage will set', () => {
            expect(instance.transactionPercentageAPICallId).toBeDefined();
        });

        when("I can select the calculate amount button with out errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("testID") === "btnTotalAmount"
            );
            buttonComponent.simulate("press");
        });

        then("Expected value of changed field", () => {
            expect(instance).toBeDefined()
            instance.hideKeyboard()
        });
 
        when("I can enter a transaction amount", () => {
            let textInputComponent = exampleBlockA.findWhere(
                node => node.prop("testID") === "txtInputTransactionAmount"
            );
            textInputComponent.simulate("changeText", '10');
        });

        then("Expected value of changed transaction amount field", () => {
            expect(instance.state.transactionAmount).toBe('10')
        });

        when("I can select the Pay amount button with out errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("testID") === "btnPayAmount"
            );
            buttonComponent.simulate("press");
            mockAPICall(instance, "collectTransactionFeesAPICallId", collectTransactionFeesAPIData);
        });

        then('Collect Transaction Fees API call ID is assigned', () => {
            expect(instance.collectTransactionFeesAPICallId).toBeDefined();
        });

        when("I can select the Pay amount button with transaction percentage is null", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("testID") === "btnPayAmount"
            );
            buttonComponent.simulate("press");
            mockAPICall(instance, "collectTransactionFeesAPICallId", collectTransactionFeesAPIData2);
        });

        then('Expected value of changed transaction percentage field', () => {
            expect(instance.collectTransactionFeesAPICallId).toBeDefined();
        });

        when("Collect Transaction Fees API network request is called", () => {
            mockAPICall(instance, "collectTransactionFeesAPICallId", mockLoginFailedResponse);
        });

        then("Collect Transaction Fees API network request fail", () => {
            expect(instance.state.isLoading).toBe(false);
        });

        when("Transaction Percentage API network request is called", () => {
            mockAPICall(instance, "transactionPercentageAPICallId", mockLoginFailedResponse);
        });

        then("Transaction Percentage API network request fail", () => {
            expect(instance.state.isLoading).toBe(false);
        });
    });
});

// Customizable Area End
