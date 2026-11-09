// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CollectTransactionFees from "../../src/CollectTransactionFees.web"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "CollectTransactionFees"
}

const collectTransactionFeesAPIData = {
    data: {
        data: {
            id: "9",
            type: "transaction_fee",
            attributes: {
                id: 9,
                transaction_number1: 10.0,
                transaction_number2: 20.0,
                transaction_number3: 30.0,
                total_transaction_fees: 60.0
            }
        }
    }
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


const feature = loadFeature('./__tests__/features/CollectTransactionFees-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
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

        when("I can enter a transaction amount", () => {
            let textInputComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "txtInputTransactionAmount"
            );
            const mockedEvent = { target: {value: '10'} }

            textInputComponent.simulate("change", mockedEvent);
        });

        then("Expected value of changed transaction amount field", () => {
            expect(instance.state.transactionAmount).toBe('10');
        });

        when("I can select the total amount button with out errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "btnTotalAmount"
            );
            buttonComponent.simulate("click");
        });

        then('Correct state values are assigned', () => {
            expect(instance.state.actualAmount).toBe(11);
        });

        when("I can select the pay amount button with out errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "btnPayAmount"
            );
            buttonComponent.simulate("click");
        });

        then('Collect Transaction Fees API call ID is assigned', () => {
            expect(instance.collectTransactionFeesAPICallId).toBeDefined();
        });

        when("Collect Transaction Fees network request is called", () => {
            mockAPICall(instance, "collectTransactionFeesAPICallId", collectTransactionFeesAPIData);
        });

        then("Transaction Percentage API call ID is assigned", () => {
            expect(instance.transactionPercentageAPICallId).toBeDefined();
        });

        when("I can enter an empty transaction amount", () => {
            let textInputComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "txtInputTransactionAmount"
            );
            const mockedEvent = { target: {value: ''} }

            textInputComponent.simulate("change", mockedEvent);
        });

        then("Expected value of changed transaction amount field", () => {
            expect(instance.state.transactionAmount).toBe('');
        });

        when("I can select the total amount button with errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "btnTotalAmount"
            );
            buttonComponent.simulate("click");
        });

        then('Error message is displayed', () => {
            expect(instance.state.transactionAmountMessage).toBe('Please enter amount');
        });

        when("I can enter an invalid transaction amount", () => {
            let textInputComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "txtInputTransactionAmount"
            );
            const mockedEvent = { target: {value: '0'} }

            textInputComponent.simulate("change", mockedEvent);
            expect(textInputComponent).toBeTruthy();
        });

        then("Expected value of changed transaction amount field", () => {
            expect(instance.state.transactionAmount).toBe('0');
        });

        when("I can select the total amount button with errors", () => {
            let buttonComponent = exampleBlockA.findWhere(
                node => node.prop("id") === "btnTotalAmount"
            );
            buttonComponent.simulate("click");
            expect(buttonComponent).toBeTruthy();
        });

        then('Error message is displayed', () => {
            expect(instance.state.transactionAmountMessage).toBe('Please enter valid amount');
        });

    });


});

// Customizable Area End
