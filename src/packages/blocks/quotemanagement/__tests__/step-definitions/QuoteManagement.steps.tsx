import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import QuoteManagement from "../../src/QuoteManagement";
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
    id: "QuoteManagement"
}

const feature = loadFeature('./__tests__/features/QuoteManagement-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to QuoteManagement', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: QuoteManagement;

        given('I am a User loading QuoteManagement', () => {
            exampleBlockA = shallow(<QuoteManagement {...screenProps} />);
        });

        when('I navigate to the QuoteManagement', () => {
            instance = exampleBlockA.instance() as QuoteManagement
        });


        then('I can select the button with with out errors', () => {
            let buttonComponentTouch = exampleBlockA.findWhere((node) => node.prop('testID') === 'touch');
            buttonComponentTouch.simulate('press');
            expect(buttonComponentTouch).toBeDefined();
        });

        then('I can leave the screen with out errors', () => {
            expect(QuoteManagement).toBeDefined();
        });
    });


});
